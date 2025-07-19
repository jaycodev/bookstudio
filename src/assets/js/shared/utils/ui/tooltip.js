export function initializeTooltips(container) {
  container.querySelectorAll('[data-tooltip="tooltip"]').forEach((el) => {
    new bootstrap.Tooltip(el, {
      trigger: 'hover',
    })

    el.addEventListener('click', () => {
      bootstrap.Tooltip.getInstance(el).hide()
    })
  })
}
