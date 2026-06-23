// SKAZINE v3
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
});
document.querySelectorAll('.nl-form').forEach(f => {
  f.addEventListener('submit', e => {
    e.preventDefault();
    const btn = f.querySelector('button');
    btn.textContent = 'You\'re in ✓';
    btn.style.background = '#4a7c4a';
    f.querySelector('input').disabled = true;
    btn.disabled = true;
  });
});
