// year
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Mega menu
  const navButtons = document.querySelectorAll('.nav-links button[data-mega]');
  const megas = document.querySelectorAll('.mega');
  let activeMega = null;
  function closeAll(){
    megas.forEach(m=>m.classList.remove('open'));
    navButtons.forEach(b=>b.classList.remove('open'));
    activeMega = null;
  }
  navButtons.forEach(btn=>{
    btn.addEventListener('mouseenter', ()=>{
      const id = 'mega-'+btn.dataset.mega;
      closeAll();
      const target = document.getElementById(id);
      if(target){ target.classList.add('open'); btn.classList.add('open'); activeMega = target; }
    });
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = 'mega-'+btn.dataset.mega;
      const target = document.getElementById(id);
      if(target.classList.contains('open')){ closeAll(); }
      else{ closeAll(); target.classList.add('open'); btn.classList.add('open'); activeMega = target; }
    });
  });
  document.querySelector('header.site').addEventListener('mouseleave', closeAll);
  megas.forEach(m=>{
    m.addEventListener('mouseenter', ()=>{ m.classList.add('open'); });
    m.addEventListener('mouseleave', closeAll);
  });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAll(); });

  // Mobile menu
  const burger = document.getElementById('burger');
  const mobile = document.getElementById('mobile-panel');
  const closeMobile = document.getElementById('close-mobile');
  burger?.addEventListener('click', ()=> mobile.classList.add('open'));
  closeMobile?.addEventListener('click', ()=> mobile.classList.remove('open'));
  mobile.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> mobile.classList.remove('open')));

  // Care menu accordion
  document.querySelectorAll('.menu-section').forEach(sec=>{
    sec.querySelector('.menu-section-head').addEventListener('click', ()=>{
      const wasOpen = sec.classList.contains('open');
      document.querySelectorAll('.menu-section').forEach(s=> s.classList.remove('open'));
      if(!wasOpen) sec.classList.add('open');
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
  }, {threshold:.12, rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

  // Testimonials carousel
  const quotes = [
    {q:'Relaxed, gentle, professional. <em>Genuinely</em> unlike any dental office I\'ve ever been to.', m:'— A patient, Cherry Creek'},
    {q:'I have real anxiety about dentistry. They <em>listened</em>. They went slow. I came back.', m:'— A patient, Denver'},
    {q:'My veneers look like <em>my</em> teeth, only the version I always wanted. Quietly perfect.', m:'— A cosmetic patient, CO'}
  ];
  let qi = 0;
  const qEl = document.getElementById('testi-quote');
  const mEl = document.getElementById('testi-meta');
  const dots = document.querySelectorAll('.testi-dot');
  function showQ(i){
    qEl.style.opacity = 0;
    setTimeout(()=>{
      qEl.innerHTML = quotes[i].q;
      mEl.textContent = quotes[i].m;
      qEl.style.opacity = 1;
      dots.forEach(d=> d.classList.toggle('active', Number(d.dataset.i)===i));
    }, 280);
  }
  qEl.style.transition = 'opacity .3s ease';
  dots.forEach(d=> d.addEventListener('click', ()=>{ qi = Number(d.dataset.i); showQ(qi); }));
  setInterval(()=>{ qi = (qi+1) % quotes.length; showQ(qi); }, 6500);