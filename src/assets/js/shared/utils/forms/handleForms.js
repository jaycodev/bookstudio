const PUBLIC_API_URL = window.PUBLIC_API_URL
import { showToast, toggleButtonLoading } from '../ui/index.js'

export function genericAddForm({
  resource,
  validateFieldFn,
  addRowFn,
  useCropper = false,
  useCustomFieldError = false,
  buildPayloadFn,
}) {
  const apiUrl = `${PUBLIC_API_URL}/api/${resource}`

  let isFirstSubmit = true
  const form = document.getElementById('addForm')
  const modal = document.getElementById('addModal')
  const submitBtn = document.getElementById('addBtn')

  form.dataset.submitted = 'false'

  modal.addEventListener('hidden.bs.modal', () => {
    isFirstSubmit = true
    form.dataset.submitted = 'false'
  })

  form.addEventListener('input', handleLiveValidation, true)
  form.addEventListener('change', handleLiveValidation, true)

  function handleLiveValidation(e) {
    if (!isFirstSubmit && ['INPUT', 'SELECT'].includes(e.target.tagName)) {
      validateFieldFn(e.target)
    }
  }

  function setFieldError(fieldId, message) {
    if (!useCustomFieldError) return
    const field = document.getElementById(fieldId)
    if (field) {
      field.classList.add('is-invalid')
      const feedback = field.parentElement.querySelector('.invalid-feedback')
      if (feedback) {
        feedback.textContent = message
      }
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (form.dataset.submitted === 'true') return
    form.dataset.submitted = 'true'
    if (isFirstSubmit) isFirstSubmit = false

    let isValid = true
    const inputs = Array.from(form.querySelectorAll('input, select')).filter(
      (el) => !(el.closest('.bootstrap-select') && el.type === 'search'),
    )

    for (const input of inputs) {
      if (!validateFieldFn(input)) isValid = false
    }

    if (!isValid) {
      form.dataset.submitted = 'false'
      return
    }

    const formData = new FormData(form)
    const payload = await buildPayloadFn(formData)

    if (useCropper && typeof cropper !== 'undefined') {
      const photoBlob = await new Promise((resolve) => {
        cropper
          .getCroppedCanvas({ width: 460, height: 460 })
          .toBlob((blob) => resolve(blob), 'image/jpeg', 0.7)
      })

      if (photoBlob) {
        // 🔜 Preparado para Cloudinary
      }
    }

    toggleButtonLoading(submitBtn, true)

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const json = await response.json()

      if (response.ok && json.success) {
        bootstrap.Modal.getInstance(modal)?.hide()
        showToast('Registro agregado exitosamente.', 'success')
        addRowFn(json.data)
      } else if (response.status === 400 && json.errorType === 'validation_error') {
        if (json.errors && Array.isArray(json.errors)) {
          json.errors.forEach((err) => {
            setFieldError(err.field, err.message)
          })
        } else {
          console.warn('Validation error sin detalles de campos:', json)
        }
        form.dataset.submitted = 'false'
      } else {
        console.error(`Backend error (${json.errorType} - ${json.statusCode}):`, json.message)
        bootstrap.Modal.getInstance(modal)?.hide()
        showToast(json.message || 'Hubo un error al registrar.', 'error')
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      showToast('Hubo un error inesperado.', 'error')
      bootstrap.Modal.getInstance(modal)?.hide()
    } finally {
      toggleButtonLoading(submitBtn, false)
    }
  })
}

export function genericEditForm({
  resource,
  validateFieldFn,
  updateRowFn,
  useCropper = false,
  useCustomFieldError = false,
  buildPayloadFn,
}) {
  const apiUrl = `${PUBLIC_API_URL}/api/${resource}`

  let isFirstSubmit = true
  const form = document.getElementById('editForm')
  const modal = document.getElementById('editModal')
  const submitBtn = document.getElementById('updateBtn')

  form.dataset.submitted = 'false'

  modal.addEventListener('hidden.bs.modal', () => {
    isFirstSubmit = true
    form.dataset.submitted = 'false'
  })

  form.addEventListener('input', handleLiveValidation, true)
  form.addEventListener('change', handleLiveValidation, true)

  function handleLiveValidation(e) {
    if (!isFirstSubmit && ['INPUT', 'SELECT'].includes(e.target.tagName)) {
      validateFieldFn(e.target)
    }
  }

  function setFieldError(fieldId, message) {
    if (!useCustomFieldError) return
    const field = document.getElementById(fieldId)
    if (field) {
      field.classList.add('is-invalid')
      const feedback = field.parentElement.querySelector('.invalid-feedback')
      if (feedback) {
        feedback.textContent = message
      }
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (form.dataset.submitted === 'true') return
    form.dataset.submitted = 'true'
    if (isFirstSubmit) isFirstSubmit = false

    let isValid = true
    const inputs = Array.from(form.querySelectorAll('input, select')).filter(
      (el) => !(el.closest('.bootstrap-select') && el.type === 'search'),
    )

    for (const input of inputs) {
      if (!validateFieldFn(input)) isValid = false
    }

    if (!isValid) {
      form.dataset.submitted = 'false'
      return
    }

    const formData = new FormData(form)
    const payload = await buildPayloadFn(formData)

    if (useCropper && typeof cropper !== 'undefined') {
      const photoBlob = await new Promise((resolve) => {
        cropper
          .getCroppedCanvas({ width: 460, height: 460 })
          .toBlob((blob) => resolve(blob), 'image/jpeg', 0.7)
      })

      if (photoBlob) {
        // 🔜 Preparado para Cloudinary
      }
    }

    toggleButtonLoading(submitBtn, true)

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const json = await response.json()

      if (response.ok && json.success) {
        bootstrap.Modal.getInstance(modal)?.hide()
        showToast('Registro actualizado exitosamente.', 'success')
        updateRowFn(json.data)
      } else if (response.status === 400 && json.errorType === 'validation_error') {
        if (json.errors && Array.isArray(json.errors)) {
          json.errors.forEach((err) => {
            setFieldError(err.field, err.message)
          })
        } else {
          console.warn('Validation error sin detalles de campos:', json)
        }
        form.dataset.submitted = 'false'
      } else {
        console.error(`Backend error (${json.errorType} - ${json.statusCode}):`, json.message)
        bootstrap.Modal.getInstance(modal)?.hide()
        showToast(json.message || 'Hubo un error al actualizar.', 'error')
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      showToast('Hubo un error inesperado.', 'error')
      bootstrap.Modal.getInstance(modal)?.hide()
    } finally {
      toggleButtonLoading(submitBtn, false)
    }
  })
}
