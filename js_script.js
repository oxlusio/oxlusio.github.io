// Minimal JS: nav toggle, smooth scroll, project filtering, contact form validation
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav
        if (primaryNav && primaryNav.classList.contains('open')) {
          primaryNav.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Project filter
  const filterSelect = document.getElementById('project-filter');
  const projectGrid = document.getElementById('projects-grid');
  if (filterSelect && projectGrid) {
    filterSelect.addEventListener('change', () => {
      const val = filterSelect.value;
      const cards = projectGrid.querySelectorAll('.project-card');
      cards.forEach(card => {
        const category = card.getAttribute('data-category') || 'all';
        if (val === 'all' || val === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Contact form (client-side)
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        contactStatus.textContent = 'Please fill in all required fields.';
        contactStatus.classList.remove('sr-only');
        return;
      }
      contactStatus.textContent = 'Sending...';
      contactStatus.classList.remove('sr-only');

      // Placeholder behavior - replace with your backend or Formspree/Netlify Forms
      // Example: fetch('/api/contact', { method: 'POST', body: formData })
      setTimeout(() => {
        contactStatus.textContent = 'Message sent! I will reply soon.';
        contactForm.reset();
        setTimeout(() => {
          contactStatus.classList.add('sr-only');
        }, 4000);
      }, 900);
    });
  }
});