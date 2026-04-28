// ============= PARTICLES =============
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99,179,237,${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ============= NAVBAR =============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  const btn = document.getElementById('scroll-top-btn');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
});

// ============= HAMBURGER =============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ============= COUNTER ANIMATION =============
function animateCounters() {
  document.querySelectorAll('.num').forEach(el => {
    const target = +el.dataset.target;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
      else el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

// ============= TYPED TEXT =============
const words = ['Technology', 'Innovation', 'Excellence', 'Your Future'];
let wi = 0, ci = 0, typing = true;
const typedEl = document.getElementById('typed-text');
function typeEffect() {
  if (!typedEl) return;
  if (typing) {
    if (ci < words[wi].length) { typedEl.textContent += words[wi][ci++]; setTimeout(typeEffect, 90); }
    else { typing = false; setTimeout(typeEffect, 1800); }
  } else {
    if (ci > 0) { typedEl.textContent = words[wi].substring(0, --ci); setTimeout(typeEffect, 50); }
    else { typing = true; wi = (wi + 1) % words.length; setTimeout(typeEffect, 300); }
  }
}
typeEffect();

// ============= SCROLL REVEAL (STAGGERED) =============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.closest('#hero') || e.target.id === 'hero') animateCounters();
    }
  });
}, { threshold: 0.1 });

const addReveal = (selector, stagger = false) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    if (stagger) el.style.transitionDelay = `${(i % 10) * 100}ms`;
    revealObserver.observe(el);
  });
};

addReveal('.sec-head');
addReveal('.about-txt');
addReveal('.tcard.active');
addReveal('.feat-card', true);
addReveal('.course-card', true);
addReveal('.partner', true);
addReveal('.sb-item', true);
addReveal('.trainer-card', true);
addReveal('.cert-card', true);
addReveal('.contact-card', true);

// Trigger counters on hero stats visible
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const statsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
  }, { threshold: 0.5 });
  statsObs.observe(heroStats);
}

// ============= TESTIMONIALS =============
let currentT = 0;
function goTo(idx) {
  const cards = document.querySelectorAll('.tcard');
  const dots = document.querySelectorAll('.dot');
  if (!cards.length) return;
  cards[currentT].classList.remove('active');
  dots[currentT].classList.remove('active');
  currentT = idx;
  cards[currentT].classList.add('active');
  dots[currentT].classList.add('active');
}
setInterval(() => goTo((currentT + 1) % document.querySelectorAll('.tcard').length || 1), 4500);

// ============= SCROLL TOP =============
const scrollBtn = document.getElementById('scroll-top-btn');
if (scrollBtn) scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ============= DYNAMIC YEAR =============
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
