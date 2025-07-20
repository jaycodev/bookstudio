import { isValidReturnDate, isValidLoanQuantity } from '../../shared/utils/forms/index.js'

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

  const returnDateId = `${mode}ReturnDate`
  const loanDateId = `${mode}LoanDate`
  const quantityId = `addQuantity`

  // Default required validation
  if (!field.value || (field.checkValidity && !field.checkValidity())) {
    field.classList.add('is-invalid')
    const feedback = field.parentElement.querySelector('.invalid-feedback')
    if (feedback) feedback.innerHTML = errorMessage
    isValid = false
  } else {
    field.classList.remove('is-invalid')
  }

  // Return date validation
  if (field.id === returnDateId) {
    const loanDateField = document.getElementById(loanDateId)
    if (loanDateField?.value) {
      const result = isValidReturnDate(loanDateField.value, field.value)
      if (!result.valid) {
        isValid = false
        errorMessage = result.message
      }
    }
  }

  // Quantity validation
  if (mode === 'add' && field.id === quantityId) {
    const value = parseInt(field.value, 10)
    const max = parseInt(field.getAttribute('max'), 10)
    const result = isValidLoanQuantity(value, max)
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
