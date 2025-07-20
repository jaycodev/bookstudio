export function togglePasswordVisibility() {
  const toggles = document.querySelectorAll('.input-group-text')

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const toggleId = toggle.getAttribute('data-toggle-id')
      const input = document.querySelector(`.password-field[data-toggle-id="${toggleId}"]`)
      const icon = toggle.querySelector('i')

      if (!input || !icon) return

      if (input.getAttribute('type') === 'password') {
        input.setAttribute('type', 'text')
        icon.classList.remove('bi-eye')
        icon.classList.add('bi-eye-slash')
      } else {
        input.setAttribute('type', 'password')
        icon.classList.remove('bi-eye-slash')
        icon.classList.add('bi-eye')
      }
    })
  })
}
