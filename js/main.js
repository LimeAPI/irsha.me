/* ============================================
   Irsha Global LLC — Main JavaScript
   Animations · Interactions · Particles
   ============================================ */

'use strict';

// ----- Debounce utility -----
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ============================================
// 1. CUSTOM CURSOR (Desktop only)
// ============================================
(function initCursor() {
  const cursor = document.getElementById('cursorRing');
  if (!cursor) return;

  // Only enable custom cursor on devices with hover (desktop)
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasHover) {
    cursor.style.display = 'none';
    return;
  }
  document.body.classList.add('has-cursor');

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;
  let isVisible = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    cursor.style.opacity = '1';
  });

  // Smooth cursor follow
  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .btn, .nav-link, .social-link, .venture-card-inner, .v-tier'
  );
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
})();

// ============================================
// 2. PARTICLE CANVAS (Gold Dust Motes)
// ============================================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let animationId;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', debounce(resize, 200));
  resize();

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3 - 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulseOffset = Math.random() * Math.PI * 2;
      this.baseOpacity = this.opacity;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Gentle mouse interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x -= dx * force * 0.005;
        this.y -= dy * force * 0.005;
      }

      // Pulse opacity
      this.opacity = this.baseOpacity + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.15;

      // Wrap around edges
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 100);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    // Draw faint connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(201, 169, 110, ${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Track mouse for particle interaction
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Regenerate particles on resize
  window.addEventListener('resize', () => {
    particles = [];
    const newCount = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 100);
    for (let i = 0; i < newCount; i++) {
      particles.push(new Particle());
    }
  });
})();

// ============================================
// 3. NAVIGATION SCROLL EFFECT
// ============================================
(function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });
})();

// ============================================
// 4. MOBILE HAMBURGER
// ============================================
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');
  const links = document.querySelectorAll('.mobile-link');
  if (!hamburger || !overlay) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (overlay.classList.contains('open')) toggleMenu();
    });
  });
})();

// ============================================
// 5. SCROLL REVEAL (Intersection Observer)
// ============================================
(function initReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // For draw animations, we need special handling
          if (entry.target.dataset.reveal === 'draw') {
            entry.target.style.transform = 'scaleX(0)';
            // Force reflow then animate
            void entry.target.offsetWidth;
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.add('revealed');
          }
          observer.unobserve(entry.target);
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
// 6. SMOOTH SCROLL FOR ANCHOR LINKS
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
// 7. PARALLAX EFFECT ON HERO (gentle)
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
          const offset = scrollY * 0.3;
          content.style.transform = `translateY(${offset}px)`;
          content.style.opacity = 1 - (scrollY / heroHeight) * 0.5;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ============================================
// 8. SCROLL INDICATOR FADE
// ============================================
(function initScrollIndicator() {
  const indicator = document.getElementById('scrollIndicator');
  if (!indicator) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      indicator.style.opacity = '0';
      indicator.style.pointerEvents = 'none';
    } else {
      indicator.style.opacity = '1';
      indicator.style.pointerEvents = 'all';
    }
  }, { passive: true });
})();

// ============================================
// 9. PAGE LOAD STAGGER ANIMATIONS
// ============================================
(function initPageLoad() {
  window.addEventListener('load', () => {
    const loadElements = document.querySelectorAll('.hero-content [data-load]');

    loadElements.forEach((el, i) => {
      setTimeout(() => {
        if (el.dataset.load === 'draw') {
          void el.offsetWidth;
          el.classList.add('revealed');
        } else {
          el.classList.add('revealed');
        }
      }, 400 + i * 250);
    });
  });
})();

// ============================================
// 10. VENTURE CARD TILT EFFECT (Desktop)
// ============================================
(function initCardTilt() {
  const cards = document.querySelectorAll('.venture-card-inner');
  if (!cards.length) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
})();

console.log('Irsha Global LLC — Site initialized.');
