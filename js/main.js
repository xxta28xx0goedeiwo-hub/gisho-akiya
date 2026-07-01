document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.querySelector('.nav-drawer');
  const overlay   = document.querySelector('.overlay');
  const backToTop = document.querySelector('.back-to-top');
  const header    = document.querySelector('header');

  const toggleMenu = () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger?.addEventListener('click', toggleMenu);
  overlay?.addEventListener('click', toggleMenu);

  document.querySelectorAll('.nav-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('open')) toggleMenu();
    });
  });

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (backToTop) backToTop.classList.toggle('show', y > 500);
    if (header)    header.classList.toggle('scrolled', y > 50);
  });

  backToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Works filter (works page only)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards  = document.querySelectorAll('.work-card[data-category]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      workCards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });
});
