import {
  isValidText,
  isValidTotalCopies,
  isValidTotalCopiesInRange,
  isValidReleaseDate,
} from '@utils/forms'

export function validateAddField(field) {
  return validateBookField(field, 'add')
}

export function validateEditField(field) {
  return validateBookField(field, 'edit')
}

function validateBookField(field, mode) {
  if (!field || !field.classList) return false

  if (field.type === 'search') return true

  let isValid = true
  let errorMessage = 'Este campo es obligatorio.'

  const titleId = `${mode}Title`
  const totalCopiesId = `${mode}TotalCopies`
  const releaseDateId = `${mode}ReleaseDate`

  // Default validation
  if (!field.value || (field.checkValidity && !field.checkValidity())) {
    field.classList.add('is-invalid')
    const feedback = field.parentElement.querySelector('.invalid-feedback')
    if (feedback) feedback.innerHTML = errorMessage
    isValid = false
  } else {
    field.classList.remove('is-invalid')
  }

  // Title validation
  if (field.id === titleId) {
    const result = isValidText(field.value, 'título')
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Total copies validation
  if (field.id === totalCopiesId) {
    const value = parseInt(field.value, 10)
    let result

    if (mode === 'edit') {
      const min = parseInt(field.getAttribute('min'), 10)
      result = isValidTotalCopiesInRange(value, min, 1000)
    } else {
      result = isValidTotalCopies(value)
    }

    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Release date validation
  if (field.id === releaseDateId) {
    const result = isValidReleaseDate(field.value)
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
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
