export function toggleButtonLoading(button, loading = true) {
	const $button = $(button)
	const $icon = $button.children('i')
	const $spinner = $button.children('.spinner-border')

	if (loading) {
		$button.prop('disabled', true)
		$icon.addClass('d-none')
		$spinner.removeClass('d-none')
	} else {
		$button.prop('disabled', false)
		$icon.removeClass('d-none')
		$spinner.addClass('d-none')
	}
}

export function toggleModalLoading(triggerElement, loading = true) {
	const modalSelector = $(triggerElement).data('bs-target')
	const $modal = $(modalSelector)

	const $spinner = $modal.find('[id$="Spinner"]')
	const $content = $modal.find('[id$="Form"], [id$="Content"]')
	const $button = $modal.find('button[id$="Btn"]')

	if (loading) {
		$spinner.removeClass('d-none')
		$content.addClass('d-none')
		if ($button.length) $button.prop('disabled', true)
	} else {
		$spinner.addClass('d-none')
		$content.removeClass('d-none')
		if ($button.length) $button.prop('disabled', false)
	}
}
