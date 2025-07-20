import { isValidText, isValidBirthDate, isValidImageFile } from '/js/shared/utils/forms/index.js'

export function validateAddField(field) {
  return validateGenericField(field, 'add')
}

export function validateEditField(field) {
  return validateGenericField(field, 'edit')
}

function validateGenericField(field, mode) {
  if (!field || !field.classList) return false

  if (field.type === 'search') return true

  let isValid = true
  let errorMessage = 'Este campo es obligatorio.'

  const nameId = `${mode}Name`
  const birthDateId = `${mode}BirthDate`
  const photoId = `${mode}Photo`

  // Default validation
  if (!field.value || (field.checkValidity && !field.checkValidity())) {
    field.classList.add('is-invalid')
    const feedback = field.parentElement.querySelector('.invalid-feedback')
    if (feedback) feedback.innerHTML = errorMessage
    isValid = false
  } else {
    field.classList.remove('is-invalid')
  }

  // Name validation
  if (field.id === nameId) {
    const result = isValidText(field.value, 'nombre')
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Birth date validation
  if (field.id === birthDateId) {
    const result = isValidBirthDate(field.value)
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Photo validation
  if (field.id === photoId) {
    const file = field.files[0]
    const result = isValidImageFile(file)

    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    } else {
      field.classList.remove('is-invalid')
      return true
    }
  }

  // Select validation
  if (field.tagName.toLowerCase() === 'select') {
    const container = field.closest('.bootstrap-select')
    if (container) {
      container.classList.toggle('is-invalid', field.classList.contains('is-invalid'))
      const feedback = container.parentElement.querySelector('.invalid-feedback')
      if (feedback) {
        feedback.innerHTML =
          mode === 'edit' ? 'Opción seleccionada inactiva o no existente.' : errorMessage
      }
    }
  }

  // Final UI feedback
  const feedback = field.parentElement.querySelector('.invalid-feedback')
  if (!isValid) {
    field.classList.add('is-invalid')
    if (feedback) {
      feedback.innerHTML = errorMessage
    }
  } else {
    field.classList.remove('is-invalid')
  }

  return isValid
}
