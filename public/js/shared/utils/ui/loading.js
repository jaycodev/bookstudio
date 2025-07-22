export function toggleButtonLoading(button, loading = true) {
  const icon = button.querySelector('i')
  const spinner = button.querySelector('.spinner-border')

  button.disabled = loading
  if (icon) icon.classList.toggle('d-none', loading)
  if (spinner) spinner.classList.toggle('d-none', !loading)
}

export function toggleModalLoading(modalSelectorOrElement, loading = true) {
  const modal =
    typeof modalSelectorOrElement === 'string'
      ? document.querySelector(modalSelectorOrElement)
      : modalSelectorOrElement

  if (!modal) return

  const paragraphs = modal.querySelectorAll('p[id^="details"], div[id^="details"]')

  paragraphs.forEach((p) => {
    p.classList.toggle('d-none', loading)
  })

  const placeholders = modal.querySelectorAll('[data-placeholder-for]')
  placeholders.forEach((ph) => {
    ph.classList.toggle('d-none', !loading)
  })

  const button = modal.querySelector('button[id$="Btn"]')
  if (button) button.disabled = loading
}
