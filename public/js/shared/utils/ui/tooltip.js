export function initializeTooltips(container) {
	$(container)
		.find('[data-tooltip="tooltip"]')
		.tooltip({
			trigger: 'hover',
		})
		.on('click', function () {
			$(this).tooltip('hide')
		})
}
