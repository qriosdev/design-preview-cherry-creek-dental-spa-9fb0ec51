// ── Mega menu
  const triggers = document.querySelectorAll('.menu > li > button[data-mega]');
  const panels = document.querySelectorAll('.mega');
  const header = document.querySelector('header.site');

  function closeAll(){
    triggers.forEach(t=>t.setAttribute('aria-expanded','false'));
    panels.forEach(p=>p.classList.remove('open'));
  }

  triggers.forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.stopPropagation();
      const id = btn.dataset.mega;
      const panel = document.querySelector(`.mega[data-panel="${id}"]`);
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      closeAll();
      if(!isOpen){
        btn.setAttribute('aria-expanded','true');
        panel.classList.add('open');
      }
    });
  });

  document.addEventListener('click', e=>{
    if(!header.contains(e.target)) closeAll();
  });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAll(); });

  // ── FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click', ()=>{
      const item = q.parentElement;
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!open) item.classList.add('open');
    });
  });

  // ── Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Make hero immediately visible (in case JS late)
  window.addEventListener('load', ()=>{
    document.querySelectorAll('.hero .reveal').forEach(el=>el.classList.add('in'));
  });
  // Safety: if no JS or IO unsupported, ensure visible
  setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in')), 1500);