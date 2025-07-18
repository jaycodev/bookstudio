/**
 * reset-password.js
 *
 * Validates the reset token and new password inputs, then sends a password reset request
 * to the RESTful API using the Fetch API. On success, updates the UI to prompt the user to log in.
 *
 * @author Jason
 */

import {
	showToast,
	togglePasswordVisibility,
} from '../../shared/utils/ui/index.js'

document.addEventListener('DOMContentLoaded', () => {
	let isFirstSubmit = false

	function getTokenFromURL() {
		const urlParams = new URLSearchParams(window.location.search)
		return urlParams.get('token')
	}

	function redirectToForgotPassword() {
		window.location.href = 'forgot-password?linkInvalid=true'
	}

	const token = getTokenFromURL()
	if (!token) {
		redirectToForgotPassword()
		return
	}

	fetch('/api/auth/validate-token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({ token }),
	})
		.then((res) => res.json())
		.then((data) => {
			if (!data.valid) {
				redirectToForgotPassword()
			}
		})
		.catch(() => redirectToForgotPassword())

	function validatePassword() {
		const password = document.getElementById('newPassword').value.trim()
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

		if (!passwordRegex.test(password)) {
			const input = document.getElementById('newPassword')
			input.classList.add('is-invalid')
			input.nextElementSibling.innerHTML =
				'La contraseña debe tener 8 caracteres, una mayúscula, un número y un símbolo.'
			return false
		} else {
			document.getElementById('newPassword').classList.remove('is-invalid')
			document.getElementById('newPassword').nextElementSibling.innerHTML = ''
			return true
		}
	}

	function validateConfirmPassword() {
		const password = document.getElementById('newPassword').value.trim()
		const confirmPassword = document
			.getElementById('confirmNewPassword')
			.value.trim()

		if (confirmPassword !== password) {
			const input = document.getElementById('confirmNewPassword')
			input.classList.add('is-invalid')
			input.nextElementSibling.innerHTML = 'Las contraseñas no coinciden.'
			return false
		} else {
			document
				.getElementById('confirmNewPassword')
				.classList.remove('is-invalid')
			document.getElementById(
				'confirmNewPassword',
			).nextElementSibling.innerHTML = ''
			return true
		}
	}

	document.getElementById('newPassword').addEventListener('input', () => {
		if (isFirstSubmit) validatePassword()
	})
	document
		.getElementById('confirmNewPassword')
		.addEventListener('input', () => {
			if (isFirstSubmit) validateConfirmPassword()
		})

	document
		.getElementById('resetPasswordForm')
		.addEventListener('submit', async function (e) {
			e.preventDefault()
			isFirstSubmit = true

			if (!validatePassword() || !validateConfirmPassword()) return

			const newPassword = document.getElementById('newPassword').value.trim()
			const btn = document.getElementById('createBtn')
			const spinner = document.getElementById('spinner')
			const resetText = document.getElementById('resetText')

			btn.disabled = true
			spinner.classList.remove('d-none')
			resetText.classList.add('d-none')

			try {
				const response = await fetch('/api/auth/reset-password', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({
						token: token,
						newPassword: newPassword,
					}),
				})
				const result = await response.json()

				if (result.success) {
					document.querySelector('header.card-header h3').textContent =
						'¡Todo listo!'
					document.querySelector('header.card-header p').textContent =
						'La contraseña se actualizó con éxito, inicie sesión nuevamente para disfrutar de BookStudio.'

					document.getElementById('newPassword').closest('.mb-4').remove()
					document
						.getElementById('confirmNewPassword')
						.closest('.mb-4')
						.remove()
					btn.remove()

					if (!document.getElementById('backToLogin')) {
						document
							.getElementById('resetPasswordForm')
							.insertAdjacentHTML(
								'beforeend',
								`<a href="login" class="btn btn-custom-primary w-100 text-decoration-none" id="backToLogin">Volver al inicio de sesión</a>`,
							)
					}
				} else {
					showToast(
						result.message || 'Ocurrió un error al restablecer la contraseña.',
						'error',
					)
				}
			} catch {
				showToast('Ocurrió un error al procesar la solicitud.', 'error')
			} finally {
				btn.disabled = false
				spinner.classList.add('d-none')
				resetText.classList.remove('d-none')
			}
		})

	togglePasswordVisibility()
})
