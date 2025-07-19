import { getCurrentPeruDate } from '@utils/ui'

export function isValidText(value, label = 'Texto', minLength = 3) {
  const clean = value?.trim() || ''
  if (clean.length < minLength) {
    return {
      valid: false,
      message: `El ${label.toLowerCase()} debe tener al menos ${minLength} caracteres.`,
    }
  }
  return { valid: true }
}

export function isValidUsername(username, minLength = 3) {
  const usernameRegex = /^[a-zA-Z0-9_À-ÿ]+$/

  if (username.length < minLength) {
    return {
      valid: false,
      message: `El nombre de usuario debe tener al menos ${minLength} caracteres.`,
    }
  }

  if (!usernameRegex.test(username)) {
    return {
      valid: false,
      message:
        'El nombre de usuario solo puede contener letras, números, guiones bajos y caracteres acentuados.',
    }
  }

  return { valid: true }
}

export function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message:
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.',
    }
  }

  return { valid: true }
}

export function doPasswordsMatch(password, confirmPassword) {
  if (password !== confirmPassword) {
    return {
      valid: false,
      message: 'Las contraseñas no coinciden.',
    }
  }
  return { valid: true }
}

export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      message: 'Por favor ingrese un correo electrónico válido.',
    }
  }
  return { valid: true }
}

export function isValidPhone(phone) {
  if (!/^[9]\d{8}$/.test(phone)) {
    return {
      valid: false,
      message: 'El número de teléfono debe comenzar con 9 y tener exactamente 9 dígitos.',
    }
  }
  return { valid: true }
}

// Personal data validations
export function isValidDNI(dni) {
  const dniPattern = /^\d{8}$/
  if (!dniPattern.test(dni)) {
    return {
      valid: false,
      message: 'El DNI debe contener exactamente 8 dígitos numéricos.',
    }
  }
  return { valid: true }
}

export function isValidBirthDate(dateStr, minAge = 10) {
  const birthDate = new Date(dateStr)
  const today = getCurrentPeruDate()
  const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate())

  if (birthDate > today) {
    return {
      valid: false,
      message: 'La fecha de nacimiento no puede ser en el futuro.',
    }
  }
  if (birthDate > minDate) {
    return { valid: false, message: `La edad mínima es de ${minAge} años.` }
  }
  return { valid: true }
}

// Address and file validations
export function isValidAddress(address, minLength = 5) {
  if (address.length < minLength) {
    return {
      valid: false,
      message: `La dirección debe tener al menos ${minLength} caracteres.`,
    }
  } else if (!/^[A-Za-zÑñ0-9\s,.\-#]+$/.test(address)) {
    return {
      valid: false,
      message: 'La dirección solo puede contener letras, números y los caracteres especiales: ,.-#',
    }
  }
  return { valid: true }
}

export function isValidImageFile(file) {
  if (!file) {
    return { valid: true }
  }

  const validExtensions = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  if (!validExtensions.includes(file.type)) {
    return {
      valid: false,
      message: 'Solo se permiten imágenes en formato JPG, PNG, GIF o WEBP.',
    }
  }

  return { valid: true }
}

export function validateImageFileUI(input) {
  const file = input.files[0]
  const result = isValidImageFile(file)

  const feedbackEl = input.parentElement.querySelector('.invalid-feedback')

  if (!result.valid) {
    input.classList.add('is-invalid')
    if (feedbackEl) {
      feedbackEl.innerHTML = result.message
      feedbackEl.style.display = 'block'
    }
    return false
  } else {
    input.classList.remove('is-invalid')
    if (feedbackEl) {
      feedbackEl.style.display = 'none'
    }
    return true
  }
}

// Business-specific validations (books and loans)
export function isValidTotalCopies(copies, maxCopies = 1000) {
  if (copies > maxCopies) {
    return {
      valid: false,
      message: `El número máximo de ejemplares es ${maxCopies}.`,
    }
  }
  return { valid: true }
}

export function isValidTotalCopiesInRange(copies, min, max) {
  if (copies < min) {
    return {
      valid: false,
      message: `La cantidad mínima de ejemplares para este libro es ${min}.`,
    }
  }
  if (copies > max) {
    return {
      valid: false,
      message: `El número máximo de ejemplares es ${max}.`,
    }
  }
  return { valid: true }
}

export function isValidReleaseDate(dateStr) {
  const releaseDate = new Date(dateStr)
  const today = getCurrentPeruDate()

  if (releaseDate > today) {
    return {
      valid: false,
      message: 'La fecha de lanzamiento no puede ser en el futuro.',
    }
  }
  return { valid: true }
}

export function isValidReturnDate(loanDateStr, returnDateStr) {
  const loanDate = new Date(loanDateStr)
  const returnDate = new Date(returnDateStr)

  const maxReturnDate = new Date(loanDate)
  maxReturnDate.setDate(loanDate.getDate() + 14)

  if (returnDate <= loanDate) {
    return {
      valid: false,
      message: 'La fecha de devolución debe ser posterior de la de préstamo.',
    }
  } else if (returnDate > maxReturnDate) {
    return {
      valid: false,
      message: 'La fecha de devolución no puede superar los 14 días.',
    }
  }

  return { valid: true }
}

export function isValidLoanQuantity(quantity, maxQuantity) {
  if (quantity > maxQuantity) {
    return {
      valid: false,
      message: `Solo hay ${maxQuantity} ejemplar${maxQuantity === 1 ? '' : 'es'} disponible${maxQuantity === 1 ? '' : 's'} para este libro.`,
    }
  }
  return { valid: true }
}

export function isValidFoundationYear(year, minYear = 1000) {
  const parsedYear = parseInt(year, 10)
  const currentYear = getCurrentPeruDate().getFullYear()

  if (isNaN(parsedYear) || parsedYear < minYear || parsedYear > currentYear) {
    return {
      valid: false,
      message: `El año debe estar entre ${minYear} y ${currentYear}.`,
    }
  }

  return { valid: true }
}
