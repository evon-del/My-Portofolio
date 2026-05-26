document.addEventListener("DOMContentLoaded", () => {
  /* ── UPTIME / SESSION TIMER ─────────────────────── */
  const start = Date.now();
  function fmt(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0) return `${h}h ${m % 60}m ${s % 60}s`;
    if (m > 0) return `${m}m ${s % 60}s`;
    return `${s}s`;
  }
  
  setInterval(() => {
    const t = fmt(Date.now() - start);
    const el = document.getElementById('uptime');
    const ft = document.getElementById('sessionTime');
    if (el) el.textContent = t;
    if (ft) ft.textContent = `session: ${t}`;
  }, 1000);

  /* ── MOBILE NAV TOGGLE ──────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('mainNav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  /* ── INTERSECTION OBSERVER — lazy fade-in ────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  /* ── ACTIVE NAV LINK ───────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--green)';
      }
    });
  }, { threshold: 0.4 });
  
  sections.forEach(s => sectionObserver.observe(s));
});