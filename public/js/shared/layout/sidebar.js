document.addEventListener('DOMContentLoaded', function () {
  const currentPage = document.getElementById('sidebar').getAttribute('data-current-page')

  document.querySelectorAll('.nav-link').forEach(function (link) {
    const icon = link.querySelector('i')

    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active-effect')
      if (icon) {
        const iconClasses = icon.className.split(' ')
        const iconClass = iconClasses[iconClasses.length - 1]
        if (!iconClass.endsWith('-fill')) {
          icon.classList.remove(iconClass)
          icon.classList.add(iconClass + '-fill')
        }
      }
    } else {
      link.classList.remove('active-effect')
    }
  })

  function initNavTooltips() {
    document.querySelectorAll('#sidebar .nav-link').forEach(function (link) {
      const instance = bootstrap.Tooltip.getInstance(link)
      if (instance) instance.dispose()
    })
    document.querySelectorAll('#sidebar .nav-link').forEach(function (link) {
      const tooltipText = link.querySelector('.sidebar-link').textContent.trim()
      if (tooltipText !== '') {
        if (!link.getAttribute('title')) {
          link.setAttribute('title', tooltipText)
        }
        new bootstrap.Tooltip(link, {
          trigger: 'hover',
          placement: 'right',
        })
      }
    })
  }

  function disposeNavTooltips() {
    document.querySelectorAll('#sidebar .nav-link').forEach(function (link) {
      const instance = bootstrap.Tooltip.getInstance(link)
      if (instance) instance.dispose()
    })
  }

  function initButtonTooltip() {
    const btn = document.getElementById('toggleSidebar')
    const instance = bootstrap.Tooltip.getInstance(btn)
    if (instance) instance.dispose()
    btn.setAttribute('title', 'Abrir barra lateral')
    new bootstrap.Tooltip(btn, {
      trigger: 'hover',
      placement: 'right',
    })
  }

  function disposeButtonTooltip() {
    const btn = document.getElementById('toggleSidebar')
    const instance = bootstrap.Tooltip.getInstance(btn)
    if (instance) instance.dispose()
    btn.removeAttribute('title')
  }

  if (document.documentElement.classList.contains('collapsed')) {
    const sidebarArrow = document.getElementById('sidebarArrow')
    sidebarArrow.classList.remove('bi-arrow-bar-left')
    sidebarArrow.classList.add('bi-arrow-bar-right')
    document.getElementById('toggleSidebar').setAttribute('aria-label', 'Abrir barra lateral')
    initNavTooltips()
    initButtonTooltip()
  } else {
    document.getElementById('toggleSidebar').setAttribute('aria-label', 'Cerrar barra lateral')
  }

  document.getElementById('toggleSidebar').addEventListener('click', function () {
    document.documentElement.classList.toggle('collapsed')

    const isCollapsed = document.documentElement.classList.contains('collapsed')
    localStorage.setItem('sidebarCollapsed', isCollapsed ? 'true' : 'false')

    const icon = document.getElementById('sidebarArrow')

    if (isCollapsed) {
      icon.classList.remove('bi-arrow-bar-left')
      icon.classList.add('bi-arrow-bar-right')
      initNavTooltips()
      initButtonTooltip()
      document.getElementById('toggleSidebar').setAttribute('aria-label', 'Abrir barra lateral')
      document.querySelector('#toggleSidebar .sidebar-link').textContent = 'Abrir barra lateral'
    } else {
      icon.classList.remove('bi-arrow-bar-right')
      icon.classList.add('bi-arrow-bar-left')
      disposeNavTooltips()
      disposeButtonTooltip()
      document.getElementById('toggleSidebar').setAttribute('aria-label', 'Cerrar barra lateral')
      document.querySelector('#toggleSidebar .sidebar-link').textContent = 'Cerrar barra lateral'
    }
  })
})
