import json, re
from datetime import datetime, timezone
from urllib.parse import urljoin
from urllib.request import Request, urlopen

SOURCES = [
    {
        "type": "income-tax",
        "source": "Income Tax Department",
        "url": "https://www.incometax.gov.in/iec/foportal/latest-news",
        "limit": 12,
    },
    {
        "type": "gst",
        "source": "CBIC GST",
        "url": "https://cbic-gst.gov.in/",
        "limit": 12,
    },
]

UA = "Mozilla/5.0 (compatible; CA-Desk-Notice-Updater/1.0)"

def get(url, timeout=25):
    req = Request(url, headers={"User-Agent": UA})
    with urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", errors="ignore")

def clean(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s or "")).strip()

def anchors(html, base):
    out=[]
    for m in re.finditer(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a\s*>', html, re.I|re.S):
        href=urljoin(base,m.group(1).strip())
        text=clean(m.group(2))
        if href.startswith("javascript:") or not text:
            continue
        out.append((text,href))
    return out

def resolve_pdf(url):
    # Only label a link as a PDF when the update URL itself is a PDF.
    # Crawling an article and taking its first PDF can accidentally attach an
    # unrelated document (for example, a generic department brochure).
    if re.search(r"\.pdf(?:$|[?#])", url, re.I):
        return url
    return None

def extract_date(text):
    patterns=[
        r"\b\d{1,2}[-/]\d{1,2}[-/]\d{4}\b",
        r"\b\d{1,2}[- ](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[- ]\d{4}\b",
        r"\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2}, \d{4}\b",
    ]
    for p in patterns:
        m=re.search(p,text,re.I)
        if m:return m.group(0)
    return ""

def build(source):
    html=get(source["url"])
    items=[]
    seen=set()
    keywords=("notification","circular","advisory","order","clarification","rules","gstr","itr","tax","gst")
    for text,href in anchors(html,source["url"]):
        low=text.lower()
        if len(text)<12 or href in seen:
            continue
        if not any(k in low for k in keywords):
            continue
        if source["type"]=="income-tax":
            # Latest-news pages contain many navigation links; keep substantive update titles.
            if len(text)>220: text=text[:217]+"..."
        seen.add(href)
        pdf=resolve_pdf(href)
        items.append({
            "id": source["type"]+"-"+str(len(items)),
            "type": source["type"],
            "source": source["source"],
            "date": extract_date(text) or datetime.now().strftime("%d %b %Y"),
            "title": text,
            "summary": "Official public departmental update.",
            "url": href,
            "pdf_url": pdf or "",
        })
        if len(items)>=source["limit"]:
            break
    return items

all_items=[]
for s in SOURCES:
    try:
        all_items.extend(build(s))
    except Exception as e:
        print("Source failed:",s["source"],e)

all_items=all_items[:24]
payload=json.dumps(all_items,ensure_ascii=False,indent=2)
open("notices.json","w",encoding="utf-8").write(payload+"\n")
print("Wrote",len(all_items),"updates")
