/**
 * Generates an HTML badge for Bootstrap Select or other components
 * @param {string} text - Text to display inside the badge
 * @param {string} type - Badge type ('success', 'danger', 'warning', 'info', 'default', 'secondary', etc.)
 * @param {string} [icon] - Bootstrap icon class (optional)
 * @returns {string} HTML for the badge
 */
export function generateBadge(text, type = 'default', icon = '') {
  const normalizedType = type || 'default'
  const iconHTML = icon ? `<i class="bi ${icon} me-1"></i>` : ''

  const badgeClassMap = {
    default: 'bg-body-secondary text-body-emphasis border',
    secondary: 'bg-body-tertiary text-body-emphasis border',
  }

  const classes =
    badgeClassMap[normalizedType] ||
    `text-${normalizedType}-emphasis bg-${normalizedType}-subtle border border-${normalizedType}-subtle`

  return `<span class="badge ${classes}">${iconHTML}${text}</span>`.trim()
}
