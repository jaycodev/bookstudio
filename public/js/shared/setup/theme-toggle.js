document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-toggle')
  const themeIcon = document.getElementById('theme-icon')

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = (theme) => localStorage.setItem('theme', theme)

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    setStoredTheme(theme)
    themeIcon.className = `bi ${theme === 'dark' ? 'bi-moon' : 'bi-sun'}`
  }

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const initThemeIcon = () => {
    const theme =
      getStoredTheme() ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    themeIcon.className = `bi ${theme === 'dark' ? 'bi-moon' : 'bi-sun'}`
  }

  if (themeToggleButton && themeIcon) {
    themeToggleButton.addEventListener('click', toggleTheme)
    initThemeIcon()
  }
})
