// Minimal JS placeholders to ensure functionality and remove 404s

document.addEventListener('DOMContentLoaded', () => {
  // Year filler (if you have <span id="year"></span>)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle (if present)
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (navList && navList.classList.contains('open')) {
          navList.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Contact form placeholder behavior (prevents submit errors)
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (contactStatus) {
        contactStatus.textContent = 'Message handled locally (replace with Formspree/Netlify).';
        contactStatus.classList.remove('sr-only');
        setTimeout(() => { contactStatus.classList.add('sr-only'); }, 3000);
      } else {
        contactForm.reset();
        alert('Form submit simulated. Replace with real backend or Formspree.');
      }
    });
  }
});
