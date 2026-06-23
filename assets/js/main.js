// SKAZINE — main.js

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

// Nav scroll shadow
window.addEventListener('scroll', () => {
  document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Demo forms
document.querySelectorAll('.demo-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.querySelector('.form-fields').style.display = 'none';
    form.querySelector('.form-success').style.display = 'block';
  });
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.filter-bar').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Newsletter demo
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');
    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#4a8c4a';
    input.value = '';
    input.disabled = true;
    btn.disabled = true;
  });
});
