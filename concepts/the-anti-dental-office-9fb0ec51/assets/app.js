// Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },{threshold:.14, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Testimonials
  const slides = document.querySelectorAll('.tm-slide');
  const dots = document.querySelectorAll('#tmDots button');
  const count = document.getElementById('tmCount');
  let active = 0;
  function go(i){
    active = (i+slides.length)%slides.length;
    slides.forEach((s,idx)=>s.classList.toggle('active', idx===active));
    dots.forEach((d,idx)=>d.classList.toggle('active', idx===active));
    count.textContent = String(active+1).padStart(2,'0') + ' / ' + String(slides.length).padStart(2,'0');
  }
  dots.forEach((d,i)=>d.addEventListener('click',()=>go(i)));
  let auto = setInterval(()=>go(active+1), 6000);
  document.getElementById('tmTrack').addEventListener('mouseenter',()=>clearInterval(auto));

  // Sticky CTA after hero
  const sticky = document.getElementById('stickyCta');
  const onScroll = ()=>{
    const y = window.scrollY;
    if(y > window.innerHeight*0.8) sticky.classList.add('show');
    else sticky.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, {passive:true});

  // Mobile menu toggle (simple)
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.primary-menu');
  hamburger?.addEventListener('click',()=>{
    if(menu.style.display==='flex'){ menu.style.display=''; }
    else{
      menu.style.display='flex';
      menu.style.flexDirection='column';
      menu.style.position='absolute';
      menu.style.top='100%';
      menu.style.left='0';
      menu.style.right='0';
      menu.style.background='var(--paper)';
      menu.style.padding='20px';
      menu.style.borderBottom='1px solid var(--line)';
      menu.style.zIndex='99';
    }
  });