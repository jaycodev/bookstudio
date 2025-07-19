document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-menu').forEach((btn) => {
    btn.addEventListener('click', function () {
      const icon = this.querySelector('i')
      icon.classList.toggle('bi-list')
      icon.classList.toggle('bi-x')
    })
  })

  const offcanvasSidebar = document.getElementById('offcanvasSidebar')
  if (offcanvasSidebar) {
    offcanvasSidebar.addEventListener('hidden.bs.offcanvas', () => {
      document.querySelectorAll('.btn-menu i').forEach((icon) => {
        icon.classList.remove('bi-x')
        icon.classList.add('bi-list')
      })
    })
  }
})
