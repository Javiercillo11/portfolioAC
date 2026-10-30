(() => {
  // Menú móvil
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.matchMedia('(min-width: 900px)').addEventListener('change', () => setMenu(false));

  // Sombra del header al hacer scroll
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animación de aparición
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // Lightbox de la galería
  const items = [...document.querySelectorAll('.gallery-item img')];
  const lb = document.getElementById('lightbox');
  const lbImg = document.createElement('img');
  lb.querySelector('.lb-figure').prepend(lbImg);
  const lbCap = lb.querySelector('figcaption');
  let current = 0;
  let lastFocus = null;

  const show = (i) => {
    current = (i + items.length) % items.length;
    lbImg.src = items[current].src;
    lbImg.alt = items[current].alt;
    lbCap.textContent = items[current].alt;
  };
  const open = (i) => {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  };
  const close = () => {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };

  items.forEach((img, i) => img.parentElement.addEventListener('click', () => open(i)));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Swipe táctil
  let startX = null;
  lb.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });

  // Año del footer
  document.getElementById('year').textContent = new Date().getFullYear();
})();
