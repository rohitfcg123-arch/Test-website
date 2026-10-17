(() => {
  const intro = document.getElementById('cosmicIntro');
  const shell = document.getElementById('siteShell');
  const canvas = document.getElementById('universe');
  const ctx = canvas?.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let particles = [], raf = 0, start = performance.now(), finished = false;
  function resize() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    canvas.width = Math.floor(innerWidth * dpr); canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(430, Math.floor(innerWidth * innerHeight / 3000));
    particles = Array.from({length:count},(_,i)=>{const a=Math.random()*Math.PI*2;const r=Math.random()*Math.max(innerWidth,innerHeight)*.7;return {a,r,s:Math.random()*1.5+.25,v:.00025+Math.random()*.0012,alpha:.2+Math.random()*.8,h:Math.random()<.15?190:Math.random()<.5?250:275,seed:Math.random()*8};});
  }
  function draw(now) {
    if (!ctx || finished) return;
    const w=innerWidth,h=innerHeight,cx=w*.5,cy=h*.49,elapsed=(now-start)/1000;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(w,h)*.75);
    bg.addColorStop(0,'rgba(35,25,82,.24)');bg.addColorStop(.5,'rgba(10,12,30,.18)');bg.addColorStop(1,'rgba(3,4,10,0)');
    ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
    const bloom=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(w,h)*(.08+Math.min(elapsed,2)*.09));
    bloom.addColorStop(0,'rgba(236,231,255,.95)');bloom.addColorStop(.08,'rgba(160,139,255,.55)');bloom.addColorStop(.4,'rgba(112,84,232,.12)');bloom.addColorStop(1,'rgba(100,75,220,0)');
    ctx.fillStyle=bloom;ctx.fillRect(0,0,w,h);
    particles.forEach(p=>{
      const spread=1+Math.min(elapsed,3)*.6;
      p.a+=p.v*(1+elapsed*.8);
      const r=p.r*spread;
      const x=cx+Math.cos(p.a)*r*(w>h?1.25:.8);
      const y=cy+Math.sin(p.a)*r*.53;
      if(x<-5||x>w+5||y<-5||y>h+5)return;
      const flicker=.5+.5*Math.sin(now*.001+p.seed);
      ctx.beginPath();ctx.fillStyle='hsla('+p.h+',90%, '+(70+flicker*20)+'%, '+(p.alpha*(.4+flicker*.6))+')';ctx.arc(x,y,p.s*(1+Math.min(elapsed,2)*.25),0,Math.PI*2);ctx.fill();
    });
    if(elapsed>.5){ctx.save();ctx.translate(cx,cy);ctx.rotate(-.25+Math.sin(now*.0002)*.05);ctx.strokeStyle='rgba(176,158,255,'+Math.min(.35,(elapsed-.5)*.12)+')';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,Math.min(w,h)*(.15+Math.min(elapsed,2)*.06),Math.min(w,h)*(.045+Math.min(elapsed,2)*.02),0,0,Math.PI*2);ctx.stroke();ctx.restore();}
    raf=requestAnimationFrame(draw);
  }
  function enter(){if(finished)return;finished=true;cancelAnimationFrame(raf);intro?.classList.add('dismissed');shell?.classList.add('revealed');document.body.classList.remove('intro-active');setTimeout(()=>{if(intro)intro.hidden=true;},1100);}
  if(reduced){if(intro)intro.hidden=true;shell?.classList.add('revealed');}
  else {document.body.classList.add('intro-active');resize();raf=requestAnimationFrame(draw);window.addEventListener('resize',resize);setTimeout(enter,3900);document.getElementById('skipIntro')?.addEventListener('click',enter);intro?.addEventListener('click',e=>{if(e.target===intro)enter();});}
  const menu=document.getElementById('mobileMenu'), nav=document.querySelector('.desktop-nav');
  menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰';});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰';}));
  document.querySelectorAll('[data-interest]').forEach(link=>link.addEventListener('click',()=>{const subject='Nexora Software Solutions - '+link.dataset.interest;const body='Hello Nexora team,%0D%0A%0D%0AI am interested in: '+encodeURIComponent(link.dataset.interest)+'%0D%0A%0D%0ABusiness / requirement details:%0D%0A%0D%0AName:%0D%0APhone:%0D%0A';link.href='mailto:rohit.fcg123@gmail.com?subject='+encodeURIComponent(subject)+'&body='+body;}));
  // Subtle pointer-reactive lighting and restrained card tilt on capable devices.
  const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(finePointer && !reduced){
    document.querySelectorAll('.service-card,.solution-card,.work-card').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
        card.style.setProperty('--mx',x+'px');card.style.setProperty('--my',y+'px');
        const rx=((y/r.height)-.5)*-2.2,ry=((x/r.width)-.5)*2.2;
        card.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-3px)';
      });
      card.addEventListener('pointerleave',()=>{card.style.transform='';card.style.setProperty('--mx','50%');card.style.setProperty('--my','0');});
    });
  }
  const topbar=document.querySelector('.topbar');
  const updateHeader=()=>topbar?.classList.toggle('scrolled',window.scrollY>24);
  updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
  document.getElementById('year').textContent=new Date().getFullYear();
  const revealTargets=document.querySelectorAll('.service-card,.solution-card,.work-card,.process-grid article,.about-copy,.about-visual,.section-intro,.solution-bottom-callout');
  revealTargets.forEach(el=>el.classList.add('reveal'));
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});revealTargets.forEach(el=>observer.observe(el));}else revealTargets.forEach(el=>el.classList.add('visible'));
})();