export function showToast(message, type) {
  const toastContainer = document.getElementById('toast-container')
  const existingToasts = toastContainer.querySelectorAll('.toast')

  existingToasts.forEach((toastEl) => {
    const toastInstance = bootstrap.Toast.getInstance(toastEl)
    if (toastInstance) toastInstance.hide()
    toastEl.remove()
  })

  let borderClasses = ''
  let iconClass = ''
  let btnCloseClass = ''

  switch (type) {
    case 'success':
      borderClasses =
        'text-success-emphasis bg-success-subtle border border-success-subtle rounded-2'
      iconClass = 'bi-check2-circle'
      btnCloseClass = 'text-success-emphasis'
      break
    case 'error':
      borderClasses = 'text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-2'
      iconClass = 'bi-x-circle'
      btnCloseClass = 'text-danger-emphasis'
      break
    case 'warning':
      borderClasses =
        'text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2'
      iconClass = 'bi-exclamation-triangle'
      btnCloseClass = 'text-warning-emphasis'
      break
  }

  const toastElement = document.createElement('div')
  toastElement.className = `toast align-items-center ${borderClasses}`
  toastElement.setAttribute('role', 'alert')
  toastElement.setAttribute('aria-live', 'assertive')
  toastElement.setAttribute('aria-atomic', 'true')
  toastElement.innerHTML = `
    <div class="d-flex px-1">
      <div class="toast-body d-flex align-items-center">
        <i class="bi ${iconClass} me-2"></i>${message}
      </div>
      <button type="button" class="btn m-0 p-0 border-0 ${btnCloseClass} ms-auto me-2" data-bs-dismiss="toast" aria-label="Close">
        <i class="bi bi-x-lg fs-6"></i>
      </button>
    </div>
  `

  toastContainer.appendChild(toastElement)

  const bootstrapToast = new bootstrap.Toast(toastElement, {
    animation: true,
    autohide: true,
    delay: 3000,
  })
  bootstrapToast.show()

  toastElement.addEventListener('hidden.bs.toast', function () {
    toastElement.remove()
  })
}
