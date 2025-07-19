export function placeholderColorDateInput() {
  const inputs = document.querySelectorAll('input[type="date"]')

  inputs.forEach((input) => {
    if (!input.value) {
      input.style.color = 'var(--placeholder-color)'
    } else {
      input.style.color = ''
    }

    input.addEventListener('change', updateColor)
    input.addEventListener('input', updateColor)
  })

  function updateColor(e) {
    const input = e.target
    if (!input.value) {
      input.style.color = 'var(--placeholder-color)'
    } else {
      input.style.color = ''
    }
  }
}
