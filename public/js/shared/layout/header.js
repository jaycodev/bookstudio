$(document).ready(function () {
  // Menu Button
  $('.btn-menu').on('click', function () {
    const icon = $(this).find('i')

    if (icon.hasClass('bi-list')) {
      icon.removeClass('bi-list').addClass('bi-x')
    } else {
      icon.removeClass('bi-x').addClass('bi-list')
    }
  })

  $('#offcanvasSidebar').on('hidden.bs.offcanvas', function () {
    $('.btn-menu i').removeClass('bi-x').addClass('bi-list')
  })

  // Keep Session
  const sessionTimeoutMinutes = 15
  const warningTimeMinutes = 2

  const sessionTimeout = sessionTimeoutMinutes * 60 * 1000
  const warningTime = (sessionTimeoutMinutes - warningTimeMinutes) * 60 * 1000

  let warningTimer, logoutTimer

  function showSessionExpiredModal() {
    $('#sessionExpiredModal').modal('show')
  }

  function startSessionTimers() {
    warningTimer = setTimeout(() => {
      showSessionExpiredModal()
    }, warningTime)

    logoutTimer = setTimeout(() => {
      logout()
    }, sessionTimeout)
  }

  function resetSessionTimers() {
    clearTimeout(warningTimer)
    clearTimeout(logoutTimer)
    startSessionTimers()
  }

  async function keepSessionAlive() {
    try {
      const response = await fetch('./api/auth/keep-alive', { method: 'GET' })
      if (response.ok) {
        resetSessionTimers()
        $('#sessionExpiredModal').modal('hide')
      } else {
        throw new Error('Respuesta inesperada')
      }
    } catch (error) {
      console.error('Error al extender la sesión:', error)
      alert('Error al extender la sesión. Intenta nuevamente.')
    }
  }

  function logout() {
    fetch('./api/auth/logout', { method: 'POST' })
      .then(() => {
        window.location.href = './login'
      })
      .catch(() => {
        window.location.href = './login'
      })
  }

  $(document).on('mousemove keydown', resetSessionTimers)

  startSessionTimers()

  $('#extendSessionBtn').click(() => keepSessionAlive())
  $('#logoutBtn').click(() => logout())
  $('#confirmLogoutBtn').click(() => logout())
})
