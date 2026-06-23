/* SKAZINE — main.js */
(function () {
  'use strict';

  // Mobile nav toggle
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Close mobile nav on link click
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Demo form intercept — prevent real submission
  document.querySelectorAll('.demo-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const notice = form.querySelector('.form-success');
      if (notice) {
        notice.style.display = 'block';
        form.querySelectorAll('input, textarea, select').forEach(function (el) {
          el.disabled = true;
        });
        const btn = form.querySelector('[type="submit"]');
        if (btn) btn.disabled = true;
      }
    });
  });

  // Scroll-based nav shadow
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 1px 0 rgba(201,168,76,0.05)'
        : 'none';
    }, { passive: true });
  }

})();
