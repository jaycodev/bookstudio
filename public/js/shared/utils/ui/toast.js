export function showToast(message, type) {
	const $toastContainer = $('#toast-container')
	$toastContainer.find('.toast').toast('hide').remove()

	let borderClasses = ''
	let iconClass = ''
	let btnCloseClass = ''

	switch (type) {
		case 'success':
			borderClasses =
				'text-success-emphasis bg-success-subtle border border-success-subtle rounded-2'
			iconClass = 'bi-check2-circle'
			btnCloseClass = 'btn-close-success'
			break
		case 'error':
			borderClasses =
				'text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-2'
			iconClass = 'bi-x-circle'
			btnCloseClass = 'btn-close-danger'
			break
		case 'warning':
			borderClasses =
				'text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2'
			iconClass = 'bi-exclamation-triangle'
			btnCloseClass = 'btn-close-warning'
			break
	}

	const $toastElement = $(`
		<div class="toast align-items-center ${borderClasses}" role="alert" aria-live="assertive" aria-atomic="true">
			<div class="d-flex">
				<div class="toast-body d-flex align-items-center">
					<i class="bi ${iconClass} me-2"></i>${message}
				</div>
				<button type="button" class="btn-close ${btnCloseClass} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
		</div>
	`)

	$toastContainer.append($toastElement)

	const bootstrapToast = new bootstrap.Toast($toastElement[0], {
		animation: true,
		autohide: true,
		delay: 3000,
	})
	bootstrapToast.show()

	$toastElement.on('hidden.bs.toast', function () {
		$(this).remove()
	})
}
