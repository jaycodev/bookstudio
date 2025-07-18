/**
 * forgot-password.js
 *
 * Handles the forgot password form validation, submission, and UI feedback. Validates email format in real time,
 * then submits the request to the RESTful API using the Fetch API. Updates the UI based on the server response.
 *
 * @author Jason
 */

import { showToast } from '../../shared/utils/ui/index.js'

document.addEventListener('DOMContentLoaded', () => {
  let isFirstSubmit = false

  const originalTitle = document.querySelector('header.card-header h3').textContent
  const originalParagraph = document.querySelector('header.card-header p').textContent
  const originalCancelHTML = document.querySelector(
    '#forgotPasswordForm a.btn-custom-secondary',
  )?.outerHTML

  function validateEmail() {
    const email = document.getElementById('email').value.trim()
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if (!emailRegex.test(email)) {
      const input = document.getElementById('email')
      input.classList.add('is-invalid')
      input.nextElementSibling.innerHTML = 'Por favor ingrese un correo electrónico válido.'
      return false
    } else {
      const input = document.getElementById('email')
      input.classList.remove('is-invalid')
      input.nextElementSibling.innerHTML = ''
      return true
    }
  }

  document.getElementById('email').addEventListener('input', () => {
    if (isFirstSubmit) validateEmail()
  })

  function updateUIOnSuccess() {
    document.querySelector('header.card-header h3').textContent = 'Comprueba tu bandeja de entrada'
    document.querySelector('header.card-header p').textContent =
      'Te hemos enviado un correo. Sigue las instrucciones para acceder a tu cuenta de BookStudio.'

    document.getElementById('email').closest('.mb-4').style.display = 'none'
    document.getElementById('sendBtn').style.display = 'none'

    const cancelBtn = document.querySelector('#forgotPasswordForm a.btn-custom-secondary')
    cancelBtn.textContent = 'Volver al inicio de sesión'
    cancelBtn.classList.remove('btn-custom-secondary', 'mt-3')
    cancelBtn.classList.add('btn-custom-primary')

    if (!document.getElementById('editBtn')) {
      const editBtn = document.createElement('button')
      editBtn.type = 'button'
      editBtn.id = 'editBtn'
      editBtn.className =
        'btn btn-custom-secondary w-100 mt-3 d-flex align-items-center justify-content-center'
      editBtn.innerHTML = `<i class="bi bi-pencil me-2"></i>Editar correo`
      cancelBtn.insertAdjacentElement('afterend', editBtn)

      editBtn.addEventListener('click', () => {
        restoreOriginalUI()
        editBtn.remove()
      })
    }
  }

  function restoreOriginalUI() {
    document.querySelector('header.card-header h3').textContent = originalTitle
    document.querySelector('header.card-header p').textContent = originalParagraph
    document.getElementById('email').closest('.mb-4').style.display = ''
    document.getElementById('sendBtn').style.display = ''
    const btn = document.querySelector('#forgotPasswordForm a.btn-custom-primary')
    if (btn && originalCancelHTML) {
      btn.outerHTML = originalCancelHTML
    }
  }

  document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    document.getElementById('alertContainer').innerHTML = ''
    isFirstSubmit = true

    if (!validateEmail()) return

    const email = document.getElementById('email').value.trim()
    const sendBtn = document.getElementById('sendBtn')
    const spinner = document.getElementById('spinner')
    const sendText = document.getElementById('sendText')

    sendBtn.disabled = true
    spinner.classList.remove('d-none')
    sendText.classList.add('d-none')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        updateUIOnSuccess()
      } else {
        if (result.target === 'field-error') {
          const input = document.getElementById('email')
          input.classList.add('is-invalid')
          input.nextElementSibling.innerHTML = result.message
        } else {
          showToast(result.message || 'Ocurrió un error al enviar el correo.', 'error')
        }
      }
    } catch {
      showToast('Ocurrió un error al procesar la solicitud.', 'error')
    } finally {
      sendBtn.disabled = false
      spinner.classList.add('d-none')
      sendText.classList.remove('d-none')

      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('linkInvalid') === 'true') {
        urlParams.delete('linkInvalid')
        const newUrl = urlParams.toString()
          ? `${location.pathname}?${urlParams}`
          : location.pathname
        window.history.replaceState({}, '', newUrl)
      }
    }
  })

  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('linkInvalid') === 'true') {
    document.getElementById('alertContainer').innerHTML = `
			<div class="alert alert-danger alert-dismissible fade show" role="alert">
				<i class="bi bi-x-circle me-1"></i>
				<small>El enlace de restablecimiento ha expirado o es inválido.</small>
			</div>`
  }
})
