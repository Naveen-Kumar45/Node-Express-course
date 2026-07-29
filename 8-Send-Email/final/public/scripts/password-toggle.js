document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.password-toggle');

  toggles.forEach((toggle) => {
    const wrapper = toggle.closest('.password-field');
    const input = wrapper ? wrapper.querySelector('input') : null;
    if (!input) return;

    toggle.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      toggle.classList.toggle('visible', show);
    });
  });
});
