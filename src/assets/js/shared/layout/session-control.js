import { PUBLIC_API_URL } from 'astro:env/client'

function setupSessionControl() {
  const sessionTimeoutMinutes = 15
  const warningTimeMinutes = 2

  const sessionTimeout = sessionTimeoutMinutes * 60 * 1000
  const warningTime = (sessionTimeoutMinutes - warningTimeMinutes) * 60 * 1000

  let warningTimer, logoutTimer

  function showSessionExpiredModal() {
    const modalEl = document.getElementById('sessionExpiredModal')
    if (!modalEl) return
    const modal = new bootstrap.Modal(modalEl)
    modal.show()
  }

  function startSessionTimers() {
    warningTimer = setTimeout(showSessionExpiredModal, warningTime)
    logoutTimer = setTimeout(logout, sessionTimeout)
  }

  function resetSessionTimers() {
    clearTimeout(warningTimer)
    clearTimeout(logoutTimer)
    startSessionTimers()
  }

  async function keepSessionAlive() {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/auth/keep-alive`)
      if (response.ok) {
        resetSessionTimers()
        const modalEl = document.getElementById('sessionExpiredModal')
        const modal = bootstrap.Modal.getInstance(modalEl)
        if (modal) modal.hide()
      } else {
        throw new Error('Respuesta inesperada del servidor')
      }
    } catch (error) {
      console.error('Error al extender la sesión:', error)
      alert('No se pudo extender la sesión. Intenta nuevamente.')
    }
  }

  function logout() {
    fetch(`${PUBLIC_API_URL}/api/auth/logout`, {
      method: 'POST',
    }).finally(() => {
      window.location.href = '/login'
    })
  }

  document.addEventListener('mousemove', resetSessionTimers)
  document.addEventListener('keydown', resetSessionTimers)
  startSessionTimers()

  document.getElementById('extendSessionBtn')?.addEventListener('click', keepSessionAlive)
  document.getElementById('logoutBtn')?.addEventListener('click', logout)
  document.getElementById('confirmLogoutBtn')?.addEventListener('click', logout)
}

setupSessionControl()
