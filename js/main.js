/* ============================================
   Irsha Global LLC — Main JavaScript
   Minimal · Refined · Performant
   ============================================ */

'use strict';

// ----- Debounce utility -----
function debounce(fn, delay = 80) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ============================================
// 1. NAVIGATION SCROLL EFFECT
// ============================================
(function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 60);
  }, { passive: true });
})();

// ============================================
// 2. MOBILE HAMBURGER
// ============================================
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');
  const links = document.querySelectorAll('.mobile-link');
  if (!hamburger || !overlay) return;

  function toggleMenu() {
    const isOpen = !overlay.classList.contains('open');
    hamburger.classList.toggle('active', isOpen);
    overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (overlay.classList.contains('open')) toggleMenu();
    });
  });
})();

// ============================================
// 3. SCROLL REVEAL (Intersection Observer)
// ============================================
(function initReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.reveal === 'draw') {
            el.style.transform = 'scaleX(0)';
            void el.offsetWidth;
            el.classList.add('revealed');
          } else {
            el.classList.add('revealed');
          }
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
})();

// ============================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
})();

// ============================================
// 5. SCROLL INDICATOR FADE
// ============================================
(function initScrollIndicator() {
  const indicator = document.getElementById('scrollIndicator');
  if (!indicator) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    indicator.style.opacity = scrollY > 180 ? '0' : '1';
    indicator.style.pointerEvents = scrollY > 180 ? 'none' : 'all';
  }, { passive: true });
})();

// ============================================
// 6. PARALLAX EFFECT ON HERO (gentle)
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
        const heroHeight = hero.offsetHeight;
        if (scrollY <= heroHeight) {
          const offset = scrollY * 0.25;
          content.style.transform = `translateY(${offset}px)`;
          content.style.opacity = Math.max(0, 1 - (scrollY / heroHeight) * 0.4);
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ============================================
// 7. VENTURE CARD GLOW FOLLOW (Desktop)
// ============================================
(function initCardGlow() {
  const cards = document.querySelectorAll('.venture-card');
  if (!cards.length) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  cards.forEach((card) => {
    let glow = card.querySelector('.venture-card-bg');
    if (!glow) {
      glow = document.createElement('div');
      glow.className = 'venture-card-bg';
      card.appendChild(glow);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.setProperty('--mx', `${x}%`);
      glow.style.setProperty('--my', `${y}%`);
      glow.style.opacity = '0.6';
    });

    card.addEventListener('mouseleave', () => {
      glow.style.opacity = '0.4';
    });
  });
})();

// ============================================
// 8. HERO GLOW PARALLAX (Desktop)
// ============================================
(function initHeroGlow() {
  const hero = document.querySelector('.hero');
  const glows = hero?.querySelectorAll('.hero-glow');
  if (!hero || !glows?.length) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    glows.forEach((glow, i) => {
      const speed = 15 + i * 10;
      const moveX = (x - 0.5) * speed;
      const moveY = (y - 0.5) * speed;
      glow.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
})();

console.log('Irsha Global LLC — Site initialized.');
