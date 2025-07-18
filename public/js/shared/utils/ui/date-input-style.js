export function placeholderColorDateInput() {
	$('input[type="date"]').each(function () {
		const $input = $(this)

		if (!$input.val()) {
			$input.css('color', 'var(--placeholder-color)')
		} else {
			$input.css('color', '')
		}
	})

	$('input[type="date"]').on('change input', function () {
		const $input = $(this)

		if (!$input.val()) {
			$input.css('color', 'var(--placeholder-color)')
		} else {
			$input.css('color', '')
		}
	})
}
