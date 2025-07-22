const PUBLIC_API_URL = window.APP_CONFIG?.PUBLIC_API_URL || 'http://localhost:8080'

import { showToast, toggleModalLoading } from './index.js'

/**
 * Initializes the "Add Entity" modal
 * Executes `onOpen` when the button that opens the modal is clicked
 */
export function initAddModal({ onOpen }) {
  $(document).on('click', '[data-bs-target="#addModal"]', function () {
    if (typeof onOpen === 'function') onOpen()
  })
}

/**
 * Initializes the details offcanvas
 * Automatically fetches from `/api/{resource}/{id}`
 */
export function initDetailsModal({ resource, onSuccess }) {
  $(document).on('click', '#table tbody tr', function () {
    const $row = $(this)
    const id = $row.data('id')
    const formattedId = $row.data('formatted-id')
    const modal = document.getElementById('detailsOffcanvas')

    if (!id) return

    $('#detailsOffcanvasID').text(formattedId)
    toggleModalLoading(modal, true)

    const detailsOffcanvas =
      bootstrap.Offcanvas.getInstance(modal) || new bootstrap.Offcanvas(modal)
    document.body.classList.add('details-open')
    detailsOffcanvas.show()

    fetch(`${PUBLIC_API_URL}/api/${resource}/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        if (!res.ok) throw { status: res.status, ...(await res.json()) }
        return res.json()
      })
      .then((data) => {
        if (typeof onSuccess === 'function') onSuccess(data)
        toggleModalLoading(modal, false)
      })
      .catch((err) => {
        console.error(`Error loading ${resource} details (${err.status}):`, err.message || err)
        showToast('Hubo un error al cargar los detalles.', 'error')
        document.body.classList.remove('details-open')
        detailsOffcanvas.hide()
      })
  })
}

/**
 * Initializes the reusable "Edit Entity" modal
 * Uses data from `getData()` and executes `onOpen(data)` if available
 */
export function initEditModal({ getData, onOpen }) {
  $(document).on('click', '[data-bs-target="#editModal"]', function () {
    const modal = document.getElementById('editModal')

    const detailsOffcanvas = bootstrap.Offcanvas.getInstance(
      document.getElementById('detailsOffcanvas'),
    )
    if (detailsOffcanvas) detailsOffcanvas.hide()

    const data = getData()
    if (!data) {
      showToast('No se pudo cargar los datos.', 'error')
      return
    }

    toggleModalLoading(modal, true)
    if (typeof onOpen === 'function') onOpen(data)
    toggleModalLoading(modal, false)
  })
}
