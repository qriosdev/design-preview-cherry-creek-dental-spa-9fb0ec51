// Year
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Mega menu toggle (desktop)
  const menu = document.getElementById('primaryMenu');
  const triggers = menu.querySelectorAll('button[data-mega]');
  triggers.forEach(btn => {
    const li = btn.parentElement;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = li.classList.contains('open');
      menu.querySelectorAll('li.open').forEach(o => o.classList.remove('open'));
      menu.querySelectorAll('button[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
      if (!isOpen){ li.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu')) {
      menu.querySelectorAll('li.open').forEach(o => o.classList.remove('open'));
      menu.querySelectorAll('button[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
    }
  });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){
    menu.querySelectorAll('li.open').forEach(o => o.classList.remove('open'));
    document.getElementById('drawer').classList.remove('open');
  }});

  // Mobile drawer
  const drawer = document.getElementById('drawer');
  document.getElementById('menuToggle').addEventListener('click', ()=>{ drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); });
  document.getElementById('drawerClose').addEventListener('click', ()=>{ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> drawer.classList.remove('open')));

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }});
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i,8)*60)+'ms';
    io.observe(el);
  });

  // Single-open accordion (FAQ) — comfort: only one open at a time
  document.querySelectorAll('.faq-list details').forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open){
        document.querySelectorAll('.faq-list details').forEach(o => { if(o!==d) o.open=false; });
      }
    });
  });