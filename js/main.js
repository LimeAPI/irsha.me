/* ============================================
   Irsha Global — Smooth Interactions (Dark)
   ============================================ */

'use strict';

// ----- Debounce -----
function debounce(fn, delay = 80) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ============================================
// 1. NAV SCROLL
// ============================================
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ============================================
// 2. MOBILE MENU
// ============================================
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');
  const links = document.querySelectorAll('.mobile-link');
  if (!hamburger || !overlay) return;

  function toggle(force) {
    const open = force ?? !overlay.classList.contains('open');
    hamburger.classList.toggle('active', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggle());
  links.forEach(l => l.addEventListener('click', () => toggle(false)));
})();

// ============================================
// 3. SCROLL REVEAL
// ============================================
(function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

// ============================================
// 4. SMOOTH SCROLL
// ============================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// ============================================
// 5. SCROLL INDICATOR
// ============================================
(function initScrollIndicator() {
  const el = document.getElementById('scrollIndicator');
  if (!el) return;

  window.addEventListener('scroll', () => {
    const hidden = window.scrollY > 180;
    el.style.opacity = hidden ? '0' : '1';
    el.style.pointerEvents = hidden ? 'none' : 'all';
  }, { passive: true });
})();

// ============================================
// 6. HERO PARALLAX (gentle)
// ============================================
(function initParallax() {
  const hero = document.getElementById('hero');
  const content = hero?.querySelector('.hero-content');
  if (!hero || !content) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const h = hero.offsetHeight;
        if (scrollY <= h) {
          content.style.transform = `translateY(${scrollY * 0.2}px)`;
          content.style.opacity = Math.max(0, 1 - (scrollY / h) * 0.35);
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ============================================
// 7. HERO ORB PARALLAX (desktop)
// ============================================
(function initOrbParallax() {
  const hero = document.querySelector('.hero');
  const orbs = hero?.querySelectorAll('.hero-orb');
  if (!hero || !orbs?.length) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    orbs.forEach((orb, i) => {
      const speed = 20 + i * 12;
      orb.style.transform = `translate(${(x - 0.5) * speed}px, ${(y - 0.5) * speed}px)`;
    });
  });
})();

// ============================================
// 8. VENTURE CARD GLOW FOLLOW (desktop)
// ============================================
(function initCardGlow() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });
})();

console.log('Irsha Global — initialized.');
