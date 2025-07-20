export function toggleButtonLoading(button, loading = true) {
  const icon = button.querySelector('i')
  const spinner = button.querySelector('.spinner-border')

  button.disabled = loading
  if (icon) icon.classList.toggle('d-none', loading)
  if (spinner) spinner.classList.toggle('d-none', !loading)
}

export function toggleModalLoading(triggerElement, loading = true) {
  const modalSelector = triggerElement.getAttribute('data-bs-target')
  const modal = document.querySelector(modalSelector)

  if (!modal) return

  const spinner = modal.querySelector('[id$="Spinner"]')
  const content = modal.querySelector('[id$="Form"], [id$="Content"]')
  const button = modal.querySelector('button[id$="Btn"]')

  if (spinner) spinner.classList.toggle('d-none', !loading)
  if (content) content.classList.toggle('d-none', loading)
  if (button) button.disabled = loading
}
