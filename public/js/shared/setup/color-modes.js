;(function () {
	const storedTheme = localStorage.getItem('theme')
	const systemPrefersDark = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches
	const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light')
	document.documentElement.setAttribute('data-bs-theme', theme)
})()
