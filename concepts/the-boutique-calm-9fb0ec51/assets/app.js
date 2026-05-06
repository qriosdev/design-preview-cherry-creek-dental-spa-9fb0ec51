// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{
  el.style.transitionDelay = (i%4)*80 + 'ms';
  io.observe(el);
});

// Mega menu (hover + focus)
const navItems = document.querySelectorAll('.nav-links li[data-menu]');
navItems.forEach(item=>{
  const btn = item.querySelector('button');
  const open = ()=>{ navItems.forEach(i=>{i.classList.remove('open'); i.querySelector('button')?.setAttribute('aria-expanded','false');}); item.classList.add('open'); btn.setAttribute('aria-expanded','true');};
  const close = ()=>{ item.classList.remove('open'); btn.setAttribute('aria-expanded','false'); };
  item.addEventListener('mouseenter', open);
  item.addEventListener('mouseleave', close);
  btn.addEventListener('focus', open);
  btn.addEventListener('click', (e)=>{ e.preventDefault(); item.classList.toggle('open'); });
  item.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
});
document.addEventListener('click',(e)=>{
  if(!e.target.closest('.nav-links')) navItems.forEach(i=>i.classList.remove('open'));
});

// Floating CTA show after hero
const fc = document.getElementById('floatCTA');
const hero = document.querySelector('.hero');
const fio = new IntersectionObserver(([entry])=>{
  fc.classList.toggle('show', !entry.isIntersecting);
},{threshold:0});
if(hero) fio.observe(hero);

// Mobile hamburger: scroll to menu on small screens (simple)
document.getElementById('hamb')?.addEventListener('click', ()=>{
  alert('Navigation: Dental Care · Your Visit · Doctors · Contact');
});