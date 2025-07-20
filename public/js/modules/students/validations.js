import {
  isValidDNI,
  isValidText,
  isValidAddress,
  isValidPhone,
  isValidEmail,
  isValidBirthDate,
} from '/js/shared/utils/forms/index.js'

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

  const dniId = `addDNI`
  const firstNameId = `${mode}FirstName`
  const lastNameId = `${mode}LastName`
  const addressId = `${mode}Address`
  const phoneId = `${mode}Phone`
  const emailId = `${mode}Email`
  const birthDateId = `${mode}BirthDate`

  // Default required validation
  if (!field.value || (field.checkValidity && !field.checkValidity())) {
    field.classList.add('is-invalid')
    const feedback = field.parentElement.querySelector('.invalid-feedback')
    if (feedback) feedback.innerHTML = errorMessage
    isValid = false
  } else {
    field.classList.remove('is-invalid')
  }

  if (mode === 'add' && field.id === dniId) {
    const result = isValidDNI(field.value)
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  if (field.id === firstNameId) {
    const result = isValidText(field.value, 'nombre')
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  if (field.id === lastNameId) {
    const result = isValidText(field.value, 'apellido')
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  if (field.id === addressId) {
    const result = isValidAddress(field.value)
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  if (field.id === phoneId) {
    const result = isValidPhone(field.value)
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  if (field.id === emailId) {
    const result = isValidEmail(field.value)
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  if (field.id === birthDateId) {
    const result = isValidBirthDate(field.value)
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Select validation
  if (field.tagName.toLowerCase() === 'select') {
    const container = field.closest('.bootstrap-select')
    if (container) {
      container.classList.toggle('is-invalid', !isValid)
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
