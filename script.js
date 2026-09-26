const checklistData={gst:["PAN and Aadhaar","Business constitution / incorporation proof","Principal place of business proof","Bank account details","Photograph and authorised signatory details"],itr:["PAN and Aadhaar","Form 16 / salary or business income records","Bank statements","Investment and deduction proofs","Previous ITR / tax records"],business:["PAN and identity documents","Business address proof","Constitution documents","Banking requirements","Applicable registrations and licences"],audit:["Books of account","Trial balance and ledgers","Bank statements","Tax and GST records","Supporting invoices and vouchers"],company:["Proposed company name options","PAN and Aadhaar of all subscribers/directors","Recent address proof and photographs","Registered office proof + recent utility bill","Owner NOC for registered office","Digital Signature Certificate (DSC) for applicable subscribers/directors","Director/Subscriber residential address proof","MOA and AOA details","Nominee consent where applicable for OPC","Details of interest in other entities","Special declarations/attachments where applicable"]};
document.querySelectorAll(".choice").forEach(btn=>btn.addEventListener("click",()=>{const r=btn.dataset.route;const data={tax:["Tax issue","Tell us about your ITR, notice, TDS or planning requirement and the CA team can guide the next step."],gst:["GST assistance","Choose the GST service you need and send a consultation request. We’ll help identify the documents and filing route."],business:["Business setup","Tell us what you are starting and the CA can map registrations, tax and compliance requirements."],accounts:["Accounts support","Get help with bookkeeping, MIS, audit preparation or ongoing accounting." ]}[r];const box=document.getElementById("route-result");box.innerHTML='<h3>'+data[0]+'</h3><p>'+data[1]+'</p><a class="btn light" style="margin-top:16px" href="#contact">Start a request →</a>';box.classList.remove("hidden")}));
const renderChecklist=()=>{const k=document.getElementById("doc-service").value;document.getElementById("checklist").innerHTML=checklistData[k].map(x=>'<li>'+x+'</li>').join("")};document.getElementById("checklist-btn").addEventListener("click",renderChecklist);renderChecklist();
function demoSave(type,data,msg){const key="caDesk_"+type;const old=JSON.parse(localStorage.getItem(key)||"[]");old.unshift({...data,createdAt:new Date().toISOString(),status:"New"});localStorage.setItem(key,JSON.stringify(old));msg.textContent="Received — this demo lead is now visible in the Admin Portal.";setTimeout(()=>msg.textContent="",4500)}
document.getElementById("lead-form").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target),data=Object.fromEntries(f.entries());demoSave("leads",data,document.getElementById("lead-msg"));e.target.reset()});
document.getElementById("question-form").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target),data=Object.fromEntries(f.entries());demoSave("questions",data,document.getElementById("question-msg"));e.target.reset()});

const menuBtn=document.querySelector(".menu");
if(menuBtn){const mobileNav=document.createElement("div");mobileNav.className="mobile-nav";mobileNav.innerHTML='<a href="#solutions">Solutions</a><a href="#services">Services</a><a href="#documents">Documents</a><a href="#tools">Tools</a><a href="#contact">Contact</a><a href="admin.html">Admin Portal ↗</a>';document.querySelector(".nav").appendChild(mobileNav);menuBtn.addEventListener("click",()=>mobileNav.classList.toggle("open"));mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileNav.classList.remove("open")));}

const aiFab=document.getElementById("ai-fab"),aiPanel=document.getElementById("ai-panel"),aiClose=document.getElementById("ai-close"),aiMessages=document.getElementById("ai-messages"),aiForm=document.getElementById("ai-form"),aiText=document.getElementById("ai-text");
function aiAdd(text,type){const d=document.createElement("div");d.className="ai-msg "+type;d.textContent=text;aiMessages.appendChild(d);aiMessages.scrollTop=aiMessages.scrollHeight}
function aiAnswer(q){
  const x=q.toLowerCase().trim();
  const has=(...words)=>words.some(w=>x.includes(w));
  const ask=(msg)=>msg;

  // CA Desk knowledge rules: intentionally deterministic. When a question is
  // fact-dependent, ask for the missing facts instead of inventing a conclusion.
  const rules=[
    {
      match:()=>has("hello","hi ","hey","namaste","namaskar"),
      answer:"Namaste! Main CA Desk ka rule-based tax & compliance assistant hoon. Aap Income Tax, GST, TDS, ITR, company/LLP registration, audit, accounting, notices, HSN/GST rate ya business compliance ke baare mein pooch sakte hain."
    },
    {
      match:()=>has("tax calculator","income tax calculator","tax kitna","tax calculate"),
      answer:"Tax estimate ke liye income type batayein: salary/pension, house property/rent, business/profession, interest/other sources, capital gains (111A/111/112/112A), special-rate income ya lottery/betting. Accurate estimate ke liye age, AY, regime, deductions aur special income details bhi zaroori ho sakti hain."
    },
    {
      match:()=>has("new regime","new tax regime","115bac","naya regime"),
      answer:"AY 2026-27 ke liye new regime mein slabs ₹4 lakh tak Nil, ₹4–8 lakh 5%, ₹8–12 lakh 10%, ₹12–16 lakh 15%, ₹16–20 lakh 20%, ₹20–24 lakh 25%, aur ₹24 lakh se upar 30% hain. Resident individual ke liye section 87A rebate ki conditions bhi apply hoti hain. Exact liability income type aur special-rate income par depend karegi."
    },
    {
      match:()=>has("old regime","old tax regime","old tax","purana regime"),
      answer:"Old regime mein slab age ke hisaab se badal sakta hai. 60 se kam age ke liye सामान्य slabs ₹2.5 lakh tak Nil, ₹2.5–5 lakh 5%, ₹5–10 lakh 20%, aur ₹10 lakh se upar 30% hain. Senior/super-senior citizens ke liye basic exemption अलग है. Exact calculation ke liye age aur deductions batayein."
    },
    {
      match:()=>has("salary","salary income","payslip","form 16"),
      answer:"Salary tax ke liye basic salary, DA, taxable allowances, perquisites, exempt allowances, standard deduction aur applicable deductions/other income dekhna hota hai. Form 16, AIS/26AS aur salary details useful rahenge. Agar aap amount bhejenge to calculator mein detailed estimate kiya ja sakta hai."
    },
    {
      match:()=>has("80c","80 c","lic","ppf","elss","epf"),
      answer:"Section 80C mein eligible investments/payments jaise EPF, PPF, eligible life insurance premium, ELSS etc. aa sakte hain, subject to statutory conditions and limits. Regime bhi important hai—new regime mein most Chapter VI-A deductions available nahi hote."
    },
    {
      match:()=>has("80d","health insurance","medical insurance"),
      answer:"Section 80D health-insurance/medical expenditure related deduction provide kar sakta hai, subject to taxpayer category, age, payment method and statutory limits. Old/new regime eligibility check karna zaroori hai."
    },
    {
      match:()=>has("80g","donation","donation deduction"),
      answer:"Eligible donations par section 80G deduction mil sakta hai, lekin institution, payment mode, qualifying percentage aur limits matter karte hain. Cash donation par statutory restriction bhi hai. Receipt sambhal kar rakhein."
    },
    {
      match:()=>has("hra","house rent allowance","rent paid"),
      answer:"HRA exemption salary structure, rent actually paid, residence city aur salary components par depend karti hai. New regime mein HRA exemption generally available nahi hoti. Exact calculation ke liye salary breakup aur rent details chahiye."
    },
    {
      match:()=>has("home loan","housing loan","section 24","24(b)","80ee","80eea"),
      answer:"Home-loan interest/principal benefits section, property type, self-occupied/let-out status, loan date and regime par depend karte hain. Section 24(b), 80C aur certain additional sections ki conditions alag hain. Property details ke bina exact deduction assume nahi karunga."
    },
    {
      match:()=>has("itr 1","itr-1","sahaj"),
      answer:"ITR-1 eligibility taxpayer ki residential status, income heads, total income aur certain exclusions par depend karti hai. Salary/pension, one house property and other-source income jaise cases cover ho sakte hain, but special/business/capital-gain circumstances can change the applicable ITR."
    },
    {
      match:()=>has("itr 2","itr-2"),
      answer:"ITR-2 generally individuals/HUFs ke liye hai jinke paas business/profession income nahi hai aur salary/pension, house property, capital gains ya other sources jaise income heads ho sakte hain. Lottery/betting/gambling winnings bhi other sources mein aa sakte hain."
    },
    {
      match:()=>has("itr 3","itr-3"),
      answer:"ITR-3 generally individuals/HUFs having income from profits and gains of business or profession ke liye relevant hota hai, subject to the form's detailed eligibility rules."
    },
    {
      match:()=>has("itr 4","itr-4","sugam"),
      answer:"ITR-4 presumptive taxation and other specified eligible cases ke liye hai, but eligibility conditions, turnover limits, residential status, income type and special-rate income restrictions check karne padte hain."
    },
    {
      match:()=>has("capital gain","capital gains","111a","111 a","112a","112 a","section 112","section 111"),
      answer:"Capital gains mein exact section aur transaction details bahut important hain. 111A specified STCG, 112A specified LTCG aur 112 other LTCG cases se related ho sakte hain. Section 111 ko generic capital-gain rate samajhna safe nahi hai—asset/transaction ki exact nature aur applicable provision verify karna chahiye. Acquisition date, transfer date, asset type, cost and exemptions/thresholds ke bina exact tax nahi batana chahiye."
    },
    {
      match:()=>has("111a","111 a"),
      answer:"Section 111A specified STCG on qualifying securities/transactions ke liye special rate provision hai. AY 2026-27 calculation mein applicable rate/conditions transaction date aur nature par depend karte hain. STT/security details ke bina final tax figure assume nahi karunga."
    },
    {
      match:()=>has("112a","112 a"),
      answer:"Section 112A specified listed equity/equity-oriented fund/business trust LTCG type cases se related hai. AY 2026-27 mein ₹1.25 lakh threshold aur 12.5% rate relevant ho sakta hai, subject to statutory conditions. Exact calculation ke liye transaction dates and qualifying security details chahiye."
    },
    {
      match:()=>has("section 112","112 ltcg","112"),
      answer:"Section 112 generally certain LTCG cases se related hai. Current rules mein 12.5% rate relevant ho sakta hai for transfers on/after the applicable change date, but land/building and grandfathering/indexation rules can alter the calculation. Asset type and acquisition/transfer dates zaroor batayein."
    },
    {
      match:()=>has("lottery","betting","gambling","horse race","winnings"),
      answer:"Lottery, betting, gambling aur certain specified winnings special-rate provisions ke under aa sakte hain; ordinary slab calculation automatically apply nahi karni chahiye. Winnings ki exact nature aur applicable section confirm karna zaroori hai."
    },
    {
      match:()=>has("tds","tax deducted","form 16a","form 16"),
      answer:"TDS query mein payment type, section, deductor/recipient status, PAN availability, threshold, rate aur payment date important hote hain. Form 16 salary ke liye aur Form 16A many non-salary TDS cases mein relevant ho sakta hai. AIS/26AS se credit verify karein."
    },
    {
      match:()=>has("26as","ais","annual information statement"),
      answer:"AIS aur Form 26AS mein reported income/TDS/TCS information check ki ja sakti hai. ITR file karne se pehle Form 16, bank statements aur AIS/26AS ko reconcile karna useful hai. Difference ho to source transaction verify karein."
    },
    {
      match:()=>has("advance tax","advance tax due"),
      answer:"Advance-tax applicability total estimated tax liability, TDS/TCS and applicable exceptions par depend karti hai. Common instalment dates 15 June, 15 September, 15 December and 15 March hoti hain, but exact obligation taxpayer-specific ho sakti hai."
    },
    {
      match:()=>has("income tax notice","tax notice","143(1)","142(1)","143(2)","148","139(9)","245"),
      answer:"Income-tax notice ko ignore na karein. Notice number, DIN/reference, issue date, response due date aur attached details dekhein. Notice ka exact text/PDF ke bina response assume nahi karunga. Notice upload/share karke CA review karwana safer hai."
    },
    {
      match:()=>has("refund","itr refund","tax refund"),
      answer:"Refund generally excess tax/TDS/TCS payment ke baad return processing par depend karta hai. Bank account validation, PAN-Aadhaar status, AIS/26AS mismatch and outstanding demand refund timing ko affect kar sakte hain."
    },
    {
      match:()=>has("gst registration","gst registration threshold","gst number","gstin"),
      answer:"GST registration applicability business type, state, turnover, supply nature and statutory exceptions par depend karti hai. Sirf turnover dekhkar final answer nahi dena chahiye. State, goods/services, turnover aur inter-State/e-commerce situation batayein."
    },
    {
      match:()=>has("gst turnover","gst limit","gst threshold"),
      answer:"GST threshold state, category of supply, special-category provisions and compulsory-registration cases par depend karta hai. Exact threshold batane se pehle state aur goods/services type confirm karna zaroori hai."
    },
    {
      match:()=>has("gstr 1","gstr1"),
      answer:"GSTR-1 outward supplies ki reporting return hai. Due date taxpayer ke filing frequency/category par depend karti hai; common monthly filers ke liye 11th of following month ek सामान्य timeline hai, but notifications/extensions and special categories can change it."
    },
    {
      match:()=>has("gstr 3b","gstr3b"),
      answer:"GSTR-3B summary return/payment form hai. Common monthly filers ke liye 20th of following month सामान्य timeline ho sakti hai, but taxpayer category, state/UT and notifications matter karte hain."
    },
    {
      match:()=>has("itc","input tax credit","input tax"),
      answer:"ITC claim ke liye eligible inward supply, tax invoice/document, receipt/conditions, supplier reporting where applicable, business use and statutory restrictions check karne hote hain. Blocked credits ko blindly claim nahi karna chahiye."
    },
    {
      match:()=>has("rcm","reverse charge"),
      answer:"RCM mein recipient certain notified supplies par GST pay karta hai instead of normal forward-charge treatment. Exact applicability supply, supplier/recipient status and notification par depend karti hai."
    },
    {
      match:()=>has("e invoice","e-invoice","einvoice"),
      answer:"E-invoicing applicability turnover/category and notified rules par depend karti hai. GSTIN, invoice details, IRN and reporting requirements correctly maintain karna important hai."
    },
    {
      match:()=>has("e way bill","eway bill","e-way"),
      answer:"E-way bill movement of goods ke prescribed cases mein required ho sakta hai. Consignment value, goods movement, distance, documents and exemptions check karne padte hain."
    },
    {
      match:()=>has("gst notice","gst notice","asmt","gst scrutiny"),
      answer:"GST notice ka exact section, period, issue date, reply deadline and allegation dekhna zaroori hai. Notice PDF/DRC/reference details ke bina generic reply dena risky hai."
    },
    {
      match:()=>has("gst return","gst filing","gst return filing"),
      answer:"GST filing mein sales register, purchase/ITC data, GSTR-1, GSTR-3B, e-invoice/e-way data and books reconcile karna useful hai. Filing frequency and taxpayer profile first confirm karein."
    },
    {
      match:()=>has("gst cancellation","cancel gst","gst surrender"),
      answer:"GST cancellation eligibility and process reason-specific hota hai. Cancellation date, final return, stock/ITC reversal and pending liabilities check karna important hai."
    },
    {
      match:()=>has("lut","letter of undertaking","export without payment"),
      answer:"LUT export/zero-rated supply without payment of IGST ke prescribed framework mein relevant ho sakta hai, subject to eligibility and compliance conditions. Export type and taxpayer status confirm karein."
    },
    {
      match:()=>has("hsn","gst rate","gst rate finder","sac"),
      answer:"HSN/SAC aur GST rate exact product/service classification par depend karte hain. Product description, composition, use and packaging jaise facts matter kar sakte hain. Built-in finder reference hai; exact classification ke liye official GST/CBIC classification verify karein."
    },
    {
      match:()=>has("company registration","private limited","pvt ltd","spice+","spice plus","mca"),
      answer:"Company incorporation mein proposed name, subscribers/directors ke PAN/Aadhaar and address proofs, registered-office proof, recent utility bill, owner NOC, DSC and MOA/AOA-related details commonly required ho sakte hain. OPC cases mein nominee consent bhi relevant ho sakta hai. Exact MCA requirements company type and application facts par depend karte hain."
    },
    {
      match:()=>has("llp registration","llp"),
      answer:"LLP setup mein proposed name, designated partners' identity/address documents, DSC, registered office proof, consent and incorporation-related filings/documentation relevant ho sakte hain. Exact list partner count and circumstances par depend karegi."
    },
    {
      match:()=>has("proprietorship","sole proprietorship"),
      answer:"Proprietorship alag incorporated legal entity nahi hoti. PAN, business address proof, bank account and applicable GST/Udyam/local/licence registrations situation ke hisaab se relevant ho sakte hain."
    },
    {
      match:()=>has("partnership firm","partnership deed","partnership"),
      answer:"Partnership setup mein partnership deed, partners' KYC, business address proof, PAN and applicable registrations commonly relevant hote hain. State-specific registration/licensing requirements verify karni chahiye."
    },
    {
      match:()=>has("udyam","msme"),
      answer:"Udyam/MSME registration business classification and eligibility framework ke under hota hai. Aadhaar/PAN and business details required ho sakte hain. Entity type and registration facts batayein."
    },
    {
      match:()=>has("accounting","bookkeeping","books of account","journal entry","ledger","trial balance"),
      answer:"Accounting support mein sales/purchase entries, receipts/payments, journal, ledger, bank reconciliation, GST/TDS reconciliation, trial balance and financial statements preparation/review cover ho sakta hai. Software (Tally/Zoho/QuickBooks) bhi bata sakte hain."
    },
    {
      match:()=>has("bank reconciliation","brs","bank reconciliation statement"),
      answer:"BRS mein book balance aur bank statement ke differences—unpresented cheques, direct credits/debits, bank charges, interest and errors—identify karke reconcile kiye jaate hain."
    },
    {
      match:()=>has("audit","statutory audit","internal audit","tax audit","concurrent audit"),
      answer:"Audit type pehle identify karein: statutory audit, tax audit, internal audit, concurrent audit ya stock audit. Applicable law, appointment, scope, turnover/eligibility and reporting requirements uske baad decide hote hain."
    },
    {
      match:()=>has("tax audit","44ab","44 ab"),
      answer:"Tax-audit applicability business/profession type, turnover/gross receipts, presumptive taxation and statutory conditions par depend karti hai. Sirf turnover amount se final conclusion har case mein nahi nikala ja sakta."
    },
    {
      match:()=>has("invoice","invoice format","bill"),
      answer:"Invoice mein applicable legal particulars, supplier/recipient details, invoice number/date, description, quantity/value, tax rate/amount and other prescribed fields correctly capture karna important hai. GST invoice requirements supply type par depend karte hain."
    },
    {
      match:()=>has("tally","zoho","quickbooks"),
      answer:"CA Desk accounting workflow mein Tally, Zoho Books ya QuickBooks jaise systems ke bookkeeping, ledger, bank reconciliation and reporting tasks ko support kiya ja sakta hai. Aap software aur problem bataiye."
    },
    {
      match:()=>has("due date","deadline","due dates","compliance calendar"),
      answer:"Compliance due date taxpayer type, filing frequency, state, financial year and government notifications par depend karti hai. Common dates useful reference hain, but filing se pehle portal/official notification par current deadline verify karni chahiye."
    },
    {
      match:()=>has("pan","pan card"),
      answer:"PAN-related issue mein application/correction status, name/DOB mismatch, Aadhaar linkage and document details identify karna important hai. Exact issue bataiye—new PAN, correction, link, status ya inactive PAN."
    },
    {
      match:()=>has("tan","tan registration"),
      answer:"TAN generally applicable TDS/TCS deductor/collector compliance ke liye relevant hota hai. Requirement payment/business structure and statutory provisions par depend karti hai."
    },
    {
      match:()=>has("tds return","24q","26q","27q","27eq"),
      answer:"TDS/TCS returns form-specific hote hain—salary, resident non-salary, non-resident payments and TCS ke liye different statements ho sakte hain. Deductor type and payment nature batayein to relevant form route identify kiya ja sakta hai."
    },
    {
      match:()=>has("late fee","interest","late filing"),
      answer:"Late fee/interest exact default, section, tax type, return and delay period par depend karta hai. Tax amount, due date and actual filing/payment date ke bina exact amount assume nahi karunga."
    },
    {
      match:()=>has("gst refund","gst refund claim"),
      answer:"GST refund type—exports, excess cash ledger, inverted duty structure, deemed exports etc.—ke hisaab se eligibility, documents and time limits differ karte hain. Refund category batayein."
    },
    {
      match:()=>has("business setup","startup","start business","new business"),
      answer:"Business start karte waqt pehle entity type choose karein: proprietorship, partnership, LLP or company. Uske baad PAN, bank, GST, Udyam, local licences, TDS and bookkeeping requirements map kiye ja sakte hain."
    },
    {
      match:()=>has("tax planning","save tax","tax saving"),
      answer:"Tax planning legal deductions/exemptions, regime choice, timing and eligible investments par based honi chahiye. Income type, regime, age and existing deductions batayein; unsupported/artificial deductions assume nahi kiye jayenge."
    },
    {
      match:()=>has("nri","non resident","non-resident","resident status"),
      answer:"NRI/residential-status tax treatment अलग हो सकता है. Residential status, India-source income, foreign income, DTAA applicability and specific income type important facts hain. Exact answer ke liye status and income source batayein."
    },
    {
      match:()=>has("agricultural income","agriculture income","farm income"),
      answer:"Agricultural income ka tax treatment source and nature par depend karta hai. Kuch cases mein agricultural income exempt ho sakti hai, while aggregation/rate purposes ke separate rules may apply. Land/location and activity details chahiye."
    },
    {
      match:()=>has("rental income","rent income","house property"),
      answer:"Rental/house-property income mein gross rent, municipal taxes, ownership share, self-occupied/let-out status, interest and applicable deductions consider hote hain. Property details ke bina exact taxable income nahi assume karunga."
    },
    {
      match:()=>has("dividend","interest income","fd interest","bank interest"),
      answer:"Interest/dividend generally income computation mein consider kiye jaate hain, but section, source, TDS and special-rate treatment matter kar sakte hain. Bank/FD interest ke liye Form 16A, AIS/26AS and bank statement reconcile karein."
    },
    {
      match:()=>has("crypto","virtual digital asset","vda"),
      answer:"VDA/crypto income ke liye separate tax/TDS provisions apply ho sakte hain. Transaction-wise sale value, cost, transfer date and TDS details chahiye; normal capital-gain assumptions automatically use nahi karunga."
    },
    {
      match:()=>has("foreign income","foreign asset","overseas"),
      answer:"Foreign income/assets ke cases mein residential status, source, disclosure requirements and DTAA can materially change the return. Country, income/asset type and residential status batayein."
    },
    {
      match:()=>has("ca fee","fees","consultation fee","charges"),
      answer:"CA fee service scope, complexity, number of returns/registrations, records and compliance requirements par depend karti hai. Exact quotation ke liye service aur business/tax profile share karein."
    }
  ];

  const hit=rules.find(r=>r.match());
  if(hit)return hit.answer;

  if(has("how","kaise","kya","what","why","help","problem","issue")){
    return ask("Main CA Desk ke Income Tax, GST, TDS, ITR, capital gains, business registration, audit, accounting aur compliance topics cover karta hoon. Precise answer ke liye question ko thoda specific karein—jaise “₹12 lakh salary, new regime tax?”, “GSTR-3B due date?”, “111A ka tax kaise niklega?” ya “Pvt Ltd registration documents?”");
  }
  return "Is question ke liye mere built-in rules mein exact match nahi mila. Main guess karke galat CA/tax advice nahi dena chahta. Aap income/service/section/notice number aur relevant amount/date bata dein; main available rule ke hisaab se guide karunga. Final filing/legal position ke liye official portal ya CA verification recommended hai.";
}
document.querySelectorAll("[data-ai]").forEach(b=>b.addEventListener("click",()=>{aiAdd(b.dataset.ai,"user");setTimeout(()=>aiAdd(aiAnswer(b.dataset.ai),"bot"),250)}));
aiFab?.addEventListener("click",()=>{aiPanel.classList.toggle("open");aiPanel.setAttribute("aria-hidden",String(!aiPanel.classList.contains("open")));});
aiClose?.addEventListener("click",()=>aiPanel.classList.remove("open"));
aiForm?.addEventListener("submit",e=>{e.preventDefault();const q=aiText.value.trim();if(!q)return;aiAdd(q,"user");aiText.value="";setTimeout(()=>aiAdd(aiAnswer(q),"bot"),300)});


// Self-service tools
const inr=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Math.max(0,n));
function slabTaxNew(income){let t=0;const slabs=[[400000,0],[400000,.05],[400000,.10],[400000,.15],[400000,.20],[400000,.25],[Infinity,.30]];let left=income;for(const [limit,rate] of slabs){const part=Math.min(left,limit);if(part>0)t+=part*rate;left-=part;if(left<=0)break}return t}
function slabTaxOld(income,age){const s=age>=80?[[500000,0],[500000,.20],[Infinity,.30]]:age>=60?[[300000,0],[200000,.05],[500000,.20],[Infinity,.30]]:[[250000,0],[250000,.05],[500000,.20],[Infinity,.30]];let t=0,left=income;for(const [limit,rate] of s){const part=Math.min(left,limit);if(part>0)t+=part*rate;left-=part;if(left<=0)break}return t}
function renderTaxInputs(){const type=document.getElementById("tax-income-type")?.value;const box=document.getElementById("tax-income-fields");if(!box)return;const common='<input id="tax-normal-income" type="number" min="0" placeholder="Amount of this income (₹)">';if(type==="salary")box.innerHTML='<input id="salary-basic" type="number" min="0" placeholder="Basic salary (₹)"><input id="salary-da" type="number" min="0" placeholder="DA / taxable allowances (₹)"><input id="salary-allowances" type="number" min="0" placeholder="Other taxable salary/allowances (₹)"><input id="salary-perquisites" type="number" min="0" placeholder="Taxable perquisites (₹)"><input id="salary-exempt" type="number" min="0" placeholder="Exempt salary/allowances (₹)"><input id="tax-standard" type="number" min="0" placeholder="Standard deduction (₹)">';else if(type==="non-salary")box.innerHTML='<input id="other-interest" type="number" min="0" placeholder="Interest income (₹)"><input id="other-rent" type="number" min="0" placeholder="Net taxable house-property/rent income (₹)"><input id="other-dividend" type="number" min="0" placeholder="Dividend / other sources (₹)">';else if(type==="business")box.innerHTML=common+'<input id="business-44ad" type="number" min="0" placeholder="Optional: presumptive taxable profit already calculated (₹)">';else if(type==="capital")box.innerHTML='<select id="capital-section"><option value="">Select section</option><option value="111A">111A — STCG on specified equity / securities</option><option value="111">111 — Other special-rate income (enter applicable rate)</option><option value="112">112 — Other LTCG</option><option value="112A">112A — LTCG on specified equity / securities</option></select><input id="capital-income" type="number" min="0" placeholder="Taxable capital gain amount (₹)"><input id="capital-exemption" type="number" min="0" placeholder="Exemption / threshold amount, if applicable (₹)"><div id="capital-rate-extra"></div>';else if(type==="special")box.innerHTML='<input id="special-rate" type="number" min="0" max="100" step="0.01" placeholder="Applicable special tax rate (%)"><input id="special-income" type="number" min="0" placeholder="Special-rate income (₹)">';else if(type==="lottery")box.innerHTML='<input id="lottery-income" type="number" min="0" placeholder="Lottery / betting / gambling winnings (₹)"><small class="tool-note">Specified winnings are taxed under special provisions rather than ordinary slabs.</small>';else box.innerHTML='<div class="tool-note">Select the income type first. No calculation is performed until an income type is selected.</div>';const sec=document.getElementById("capital-section");sec?.addEventListener("change",()=>{const x=document.getElementById("capital-rate-extra");if(sec.value==="111")x.innerHTML='<input id="section111-rate" type="number" min="0" max="100" step="0.01" placeholder="Applicable Section 111 rate (%)">';else x.innerHTML=""})}
document.getElementById("tax-income-type")?.addEventListener("change",renderTaxInputs);renderTaxInputs();
function n(id){return Math.max(0,Number(document.getElementById(id)?.value)||0)}
function calculateTax(){const type=document.getElementById("tax-income-type")?.value;if(!type){document.getElementById("tax-result").innerHTML="<strong>Select the income type first.</strong>";return}const regime=document.getElementById("tax-regime").value;const deduction=n("tax-deduction");let normal=0,special=0,details=[];if(type==="salary"){const gross=n("salary-basic")+n("salary-da")+n("salary-allowances")+n("salary-perquisites");const exempt=n("salary-exempt");const standard=n("tax-standard");normal=Math.max(0,gross-exempt-standard-deduction);details.push("Salary gross: "+inr(gross),"Exempt: "+inr(exempt),"Standard deduction: "+inr(standard));}else if(type==="non-salary"){normal=Math.max(0,n("other-interest")+n("other-rent")+n("other-dividend")-deduction);details.push("Other-source income: "+inr(normal));}else if(type==="business"){normal=Math.max(0,n("business-44ad")||n("tax-normal-income")-deduction);details.push("Business/profession taxable income: "+inr(normal));}else if(type==="capital"){const sec=document.getElementById("capital-section")?.value;const gain=n("capital-income");const exemption=n("capital-exemption");if(!sec||!gain){document.getElementById("tax-result").innerHTML="<strong>Select the section and enter the capital gain.</strong>";return}let taxable=Math.max(0,gain-exemption),rate=0;if(sec==="111A"){rate=20;details.push("Section 111A @ 20%");}else if(sec==="112A"){rate=12.5;const threshold=Math.max(0,125000-exemption);taxable=Math.max(0,gain-threshold);details.push("Section 112A @ 12.5% after ₹1.25 lakh threshold where applicable");}else if(sec==="112"){rate=12.5;details.push("Section 112 @ 12.5% reference rate; specific cases may have different treatment");}else if(sec==="111"){rate=n("section111-rate");if(!rate){document.getElementById("tax-result").innerHTML="<strong>Enter the applicable Section 111 rate.</strong>";return}details.push("Section 111 @ entered rate "+rate+"%");}special=taxable*rate/100;details.push("Taxable gain: "+inr(taxable));}else if(type==="special"){const rate=n("special-rate"),income=n("special-income");if(!rate||!income){document.getElementById("tax-result").innerHTML="<strong>Enter the applicable special rate and income.</strong>";return}special=income*rate/100;details.push("Special income: "+inr(income)+" @ "+rate+"%");}else if(type==="lottery"){const winnings=n("lottery-income");if(!winnings){document.getElementById("tax-result").innerHTML="<strong>Enter the winnings amount.</strong>";return}special=winnings*.30;details.push("Lottery/betting winnings: "+inr(winnings)+" @ 30%");}let slab=0;if(normal>0)slab=regime==="old"?slabTaxOld(normal,0):slabTaxNew(normal);let rebate=0;if(special===0&&regime==="new"&&normal<=1200000)rebate=Math.min(slab,60000);if(special===0&&regime==="old"&&normal<=500000)rebate=Math.min(slab,12500);slab=Math.max(0,slab-rebate);const base=slab+special;const cess=base*.04,total=base+cess;document.getElementById("tax-result").innerHTML='<strong>Estimated tax payable</strong><div class="rate">'+inr(total)+'</div><div>Normal-slab tax: '+inr(slab)+' · Special-rate tax: '+inr(special)+' · 4% cess: '+inr(cess)+'</div><div class="tax-breakdown">'+details.map(x=>'<small>'+x+'</small>').join("<br>")+'</div><small>Final liability can also depend on surcharge, marginal relief, TDS/TCS, set-off, losses, exemptions and other section-specific rules.</small>'}
document.getElementById("tax-calc")?.addEventListener("click",calculateTax);
const hsnData=[
{keys:["kulfi","ice cream","kulfi"],code:"2105",desc:"Kulfi",rate:"18%"},{keys:["maize seeds","corn seeds"],code:"1005",desc:"Maize of seed quality",rate:"Nil"},{keys:["water purifier","water filter","filter"],code:"8421",desc:"Filters or water purifiers",rate:"18%"},{keys:["lac bangles","shellac bangles","bangles"],code:"7117",desc:"Lac or shellac bangles",rate:"3%"},{keys:["idli dosa batter","dosa batter","idli batter"],code:"2106",desc:"Idli/Dosa batter (food mixes)",rate:"18%"},{keys:["nail polish"],code:"3304",desc:"Nail polish",rate:"28%"},{keys:["wet dates","dates"],code:"0804",desc:"Wet dates",rate:"12%"},{keys:["pet food","dog food","cat food"],code:"2309",desc:"Dog or cat food",rate:"18%"},{keys:["khari","hard butter"],code:"1905",desc:"Khari and hard butters",rate:"18%"},{keys:["khoya","mawa"],code:"0402",desc:"Khoya/Mawa (concentrated milk)",rate:"5%"},{keys:["tamarind fresh"],code:"0810",desc:"Fresh tamarind",rate:"Nil"},{keys:["tamarind dry","dry tamarind"],code:"0813",desc:"Dry tamarind",rate:"12%"},{keys:["hair rubber band","rubber band"],code:"4016",desc:"Hair rubber bands",rate:"28%"},{keys:["carton corrugated","corrugated carton"],code:"4819",desc:"Corrugated paper/paperboard cartons",rate:"12%"}];
function findHSN(){const q=document.getElementById("hsn-query").value.trim().toLowerCase();const box=document.getElementById("hsn-result");if(!q){box.innerHTML="Enter a product name or HSN heading.";return}const clean=q.replace(/\\s/g,"");let hits=hsnData.filter(x=>x.keys.some(k=>q.includes(k)||k.includes(q)));if(/^\\d{4,8}$/.test(clean))hits=hsnData.filter(x=>x.code===clean||clean.startsWith(x.code)||x.code.startsWith(clean));if(!hits.length){box.innerHTML="<strong>No built-in match.</strong><br>Use the official CBIC/GST HSN search for the exact product description and classification." ;return}box.innerHTML=hits.slice(0,4).map(x=>'<div style="margin-bottom:10px"><strong>HSN '+x.code+'</strong> — '+x.desc+'<br><span class="rate">'+x.rate+' GST</span></div>').join("")}
document.getElementById("hsn-search")?.addEventListener("click",findHSN);document.getElementById("hsn-query")?.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();findHSN()}});
let selectedDocs=[];const fileInput=document.getElementById("document-files"),uploadList=document.getElementById("upload-list"),uploadMsg=document.getElementById("upload-msg");function renderUploads(){uploadList.innerHTML=selectedDocs.map((f,i)=>'<div class="upload-item"><span>'+f.name+' · '+Math.round(f.size/1024)+' KB</span><button type="button" data-remove="'+i+'">×</button></div>').join("");uploadList.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{selectedDocs.splice(Number(b.dataset.remove),1);renderUploads()}))}fileInput?.addEventListener("change",e=>{const incoming=[...e.target.files].filter(f=>f.size<=10*1024*1024);const totalSelected=e.target.files.length;selectedDocs=[...selectedDocs,...incoming];renderUploads();e.target.value="";if(incoming.length<totalSelected)uploadMsg.textContent="Some files were skipped because they exceed 10 MB.";});document.getElementById("upload-send")?.addEventListener("click",()=>{if(!selectedDocs.length){uploadMsg.textContent="Choose at least one document first.";return}const meta=selectedDocs.map(f=>({name:f.name,size:f.size,type:f.type,createdAt:new Date().toISOString()}));localStorage.setItem("caDesk_documentUploads",JSON.stringify(meta));uploadMsg.textContent=meta.length+" document(s) added to this browser session. Connect Firebase Storage for real CA-side uploads.";});
