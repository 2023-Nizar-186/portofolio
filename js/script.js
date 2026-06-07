/* ============================
   PORTFOLIO JAVASCRIPT
   Ahmad Nizar Rusdiawan
   ============================ */

'use strict';

// ============================
// LOADER
// ============================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    document.body.style.overflow = '';
    initRevealObserver();
    initSkillBars();
    initCounters();
    initTyping();
    initParticles();
  }, 2000);
});
document.body.style.overflow = 'hidden';

// ============================
// THEME TOGGLE
// ============================
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('portfolio-theme') || 'dark';
document.body.dataset.theme = storedTheme;

themeToggle.addEventListener('click', () => {
  const current = document.body.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
});

// ============================
// NAVBAR SCROLL
// ============================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = scrollY;
  updateActiveNav();
  updateBackToTop(scrollY);
}, { passive: true });

// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});

// ============================
// ACTIVE NAV HIGHLIGHT
// ============================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
      });
    }
  });
}

// ============================
// BACK TO TOP
// ============================
const backToTop = document.getElementById('backToTop');

function updateBackToTop(scrollY) {
  backToTop.classList.toggle('visible', scrollY > 400);
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ============================
// INTERSECTION OBSERVER (REVEAL)
// ============================
function initRevealObserver() {
  const revealEls = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ============================
// SKILL BARS ANIMATION
// ============================
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ============================
// ANIMATED COUNTERS
// ============================
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1500;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ============================
// TYPING EFFECT
// ============================
function initTyping() {
  const roles = [
    'Data Analytics Enthusiast',
    'Data Science Learner',
    'Machine Learning Enthusiast',
    'Informatika Student',
    'Python Developer',
  ];
  const el = document.getElementById('typingText');
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 120;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      delay = 60;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      delay = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }
  setTimeout(type, 800);
}

// ============================
// SKILLS TAB FILTER
// ============================
const tabBtns = document.querySelectorAll('.tab-btn');
const skillCards = document.querySelectorAll('.skill-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.tab;

    skillCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ============================
// PARTICLES
// ============================
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = [];
  const count = window.innerWidth < 768 ? 30 : 60;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  const colors = ['99,102,241', '139,92,246', '167,139,250'];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      const color = colors[i % colors.length];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${p.alpha})`;
      ctx.fill();

      // connect nearby
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / 100) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ============================
// COPY EMAIL
// ============================
function copyEmail(e) {
  e.preventDefault();
  e.stopPropagation();
  navigator.clipboard.writeText('ahmadzarik4576@gmail.com').then(() => {
    const btn = document.getElementById('copyEmailBtn');
    btn.classList.add('copied');
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    }, 2000);
  }).catch(() => {
    alert('Email: ahmadzarik4576@gmail.com');
  });
}

// ============================
// PROJECT MODAL
// ============================
const projects = [
  {
    icon: '📱',
    hue: 230,
    title: 'Boicell Mobile Service Application',
    status: 'Academic Project',
    statusClass: '',
    desc: 'Mengembangkan aplikasi mobile untuk pemesanan layanan perbaikan perangkat, reservasi teknisi, manajemen garansi, dan dukungan pelanggan. Mengimplementasikan antarmuka responsif, integrasi REST API, serta pengelolaan data transaksi dan layanan untuk meningkatkan pengalaman pengguna.',
    stack: ['Flutter', 'Dart', 'REST API', 'JSON'],
    github: 'https://github.com/2023-Nizar-186',
  },
  {
    icon: '🧠',
    hue: 265,
    title: 'Food Price Sentiment Analysis Using NLP',
    status: 'Academic Project',
    statusClass: '',
    desc: 'Membangun model klasifikasi sentimen berita ketahanan pangan menggunakan teknik NLP, feature engineering, dan machine learning untuk mengidentifikasi sentimen positif, negatif, dan netral dari berbagai sumber berita. Meliputi proses text preprocessing, TF-IDF vectorization, dan model evaluation.',
    stack: ['Python', 'Pandas', 'Scikit-Learn', 'NLP', 'TF-IDF'],
    github: 'https://github.com/2023-Nizar-186',
  },
  {
    icon: '🏫',
    hue: 160,
    title: 'Campus Canteen Agent-Based Simulation',
    status: 'Academic Project',
    statusClass: '',
    desc: 'Simulasi perilaku mahasiswa dalam memilih kantin menggunakan Agent-Based Modeling (ABM) untuk menganalisis antrean, kepadatan, dan preferensi pengguna. Menggunakan framework Mesa untuk Python dengan visualisasi data interaktif.',
    stack: ['Python', 'Mesa', 'Data Visualization', 'ABM'],
    github: 'https://github.com/2023-Nizar-186',
  },
  {
    icon: '📱',
    hue: 320,
    title: 'Student Stress Social Media ABM Simulation',
    status: 'Research Project',
    statusClass: 'research',
    desc: 'Simulasi tingkat stres mahasiswa akibat social comparison di media sosial menggunakan pendekatan Agent-Based Modeling. Proyek ini meneliti dampak perilaku komparasi sosial pada kesejahteraan mental mahasiswa melalui pemodelan berbasis agen.',
    stack: ['Python', 'Mesa', 'ABM', 'Social Simulation'],
    github: 'https://github.com/2023-Nizar-186',
  },
  {
    icon: '⚽',
    hue: 40,
    title: 'Sprinta Sports Platform',
    status: 'Team Project',
    statusClass: 'team',
    desc: 'Platform olahraga yang menyediakan fitur reservasi lapangan, manajemen member gym, serta informasi event olahraga. Dibangun secara kolaboratif menggunakan Laravel dengan manajemen database MySQL untuk mengelola data member, booking, dan transaksi.',
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
    github: 'https://github.com/2023-Nizar-186',
  },
  {
    icon: '⚔',
    hue: 15,
    title: 'Unwritten: The Myth Begins',
    status: 'Personal Project',
    statusClass: 'personal',
    desc: 'Game action-platformer 2D yang sedang dikembangkan menggunakan Godot Engine dengan fokus pada combat system, parry mechanic, lore misterius, dan eksplorasi dunia fantasi. Proyek personal yang mengeksplorasi game design dan pengembangan indie game.',
    stack: ['Godot', 'GDScript', 'Game Design', '2D Art'],
    github: 'https://github.com/2023-Nizar-186',
  },
];

const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openProjectModal(index) {
  const p = projects[index];
  const statusColors = {
    '': 'background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);color:#818CF8',
    'research': 'background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);color:#C4B5FD',
    'team': 'background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);color:#86EFAC',
    'personal': 'background:rgba(251,146,60,0.15);border:1px solid rgba(251,146,60,0.3);color:#FCD34D',
  };

  modalBody.innerHTML = `
    <div class="modal-thumb" style="background:linear-gradient(135deg,hsl(${p.hue},60%,15%),hsl(${p.hue+30},70%,20%))">
      <span style="font-size:3rem">${p.icon}</span>
    </div>
    <div class="modal-tag" style="${statusColors[p.statusClass] || statusColors['']}">${p.status}</div>
    <h2 class="modal-title" id="modalTitle">${p.title}</h2>
    <p class="modal-desc">${p.desc}</p>
    <div class="modal-stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
    <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="modal-link">
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
      Lihat di GitHub
    </a>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ============================
// PARALLAX (hero section only)
// ============================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) canvas.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
}, { passive: true });

// Expose global functions
window.copyEmail = copyEmail;
window.openProjectModal = openProjectModal;
