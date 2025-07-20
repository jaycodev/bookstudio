const PUBLIC_API_URL = window.PUBLIC_API_URL
import { toggleTableLoadingState, setupDataTable } from './datatable-setup.js'
import { showToast, initializeTooltips } from '../ui/index.js'

export async function loadTableData({ resource, generateRow, generatePDF, generateExcel }) {
  const apiUrl = `${PUBLIC_API_URL}/api/${resource}`

  toggleTableLoadingState('loading')

  const safetyTimer = setTimeout(() => {
    toggleTableLoadingState('loaded')
    document.getElementById('tableContainer').classList.remove('d-none')
  }, 8000)

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })

    clearTimeout(safetyTimer)

    const tableBody = document.querySelector('#table tbody')
    tableBody.innerHTML = ''

    if (response.status === 200) {
      const data = await response.json()

      if (data.length > 0) {
        data.forEach((item) => {
          const row = generateRow(item)
          tableBody.insertAdjacentHTML('beforeend', row)
        })
        initializeTooltips(tableBody)
      }

      const generateButtons = document.querySelectorAll('#generatePDF, #generateExcel')
      generateButtons.forEach((btn) => (btn.disabled = data.length === 0))
    } else if (response.status === 204) {
      const generateButtons = document.querySelectorAll('#generatePDF, #generateExcel')
      generateButtons.forEach((btn) => (btn.disabled = true))
    } else {
      try {
        const errorResponse = await response.json()
        console.error(
          `Error listing data (${errorResponse.errorType} - ${response.status}):`,
          errorResponse.message,
        )
      } catch {
        console.error('Unexpected error:', response.status)
      }
      showToast('Hubo un error al listar los datos.', 'error')
    }

    if ($.fn.DataTable.isDataTable('#table')) {
      $('#table').DataTable().destroy()
    }

    const dataTable = setupDataTable('#table')

    dataTable.on('draw', function () {
      const filteredCount = dataTable.rows({ search: 'applied' }).count()
      const noDataMessage = document.querySelector('#table td.dataTables_empty') !== null
      const generateButtons = document.querySelectorAll('#generatePDF, #generateExcel')
      generateButtons.forEach((btn) => (btn.disabled = filteredCount === 0 || noDataMessage))
    })

    const pdfBtn = document.getElementById('generatePDF')
    const excelBtn = document.getElementById('generateExcel')

    pdfBtn.replaceWith(pdfBtn.cloneNode(true))
    excelBtn.replaceWith(excelBtn.cloneNode(true))

    document.getElementById('generatePDF').addEventListener('click', () => generatePDF(dataTable))
    document
      .getElementById('generateExcel')
      .addEventListener('click', () => generateExcel(dataTable))
  } catch (err) {
    clearTimeout(safetyTimer)

    console.error('Unexpected error:', err)
    showToast('Hubo un error al listar los datos.', 'error')

    const tableBody = document.querySelector('#table tbody')
    tableBody.innerHTML = ''

    if ($.fn.DataTable.isDataTable('#table')) {
      $('#table').DataTable().destroy()
    }

    setupDataTable('#table')
  }
}
