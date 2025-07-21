export function toggleTableLoadingState(action) {
  const skeletonTable = document.getElementById('skeletonTable')
  const realTable = document.getElementById('table')

  const exportButtons = document.querySelectorAll('#generatePDF, #generateExcel')
  const addButton = document.querySelector('#buttonGroupHeader button[data-bs-target="#addModal"]')

  if (action === 'loading') {
    skeletonTable.classList.remove('d-none')
    realTable.classList.add('d-none')

    exportButtons.forEach((btn) => (btn.disabled = true))
    if (addButton) addButton.disabled = true
  }

  if (action === 'loaded') {
    skeletonTable.classList.add('d-none')
    realTable.classList.remove('d-none')

    if (!$.fn.DataTable.isDataTable('#table')) return

    const table = $('#table').DataTable()
    const hasVisibleRows = table.rows({ search: 'applied' }).count() > 0

    exportButtons.forEach((btn) => {
      btn.disabled = !hasVisibleRows
    })

    if (addButton) addButton.disabled = false
  }
}

export function setupDataTable(tableId) {
  const table = $(tableId).DataTable({
    responsive: true,
    searching: true,
    lengthChange: true,
    paging: true,
    ordering: true,
    order: [[0, 'desc']],
    pageLength: 15,
    lengthMenu: [
      [10, 15, 25, -1],
      [10, 15, 25, 'Todo'],
    ],
    columnDefs: [{ orderable: false, targets: -1 }],
    language: {
      search: '',
      searchPlaceholder: 'Buscar...',
      lengthMenu: 'Mostrar _MENU_ ',
      info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
      infoEmpty: 'Mostrando 0 a 0 de 0 registros',
      infoFiltered: '(filtrado de _MAX_ registros totales)',
      zeroRecords: 'No se encontraron registros coincidentes',
      emptyTable: 'No hay datos disponibles en la tabla',
    },
    initComplete: function () {
      toggleTableLoadingState('loaded')

      const dtSearch = document.querySelector('.dt-search')
      const label = dtSearch.querySelector('label')
      if (label) label.remove()

      dtSearch.classList.add('input-group', 'input-group-sm')
      dtSearch.insertAdjacentHTML(
        'afterbegin',
        '<span class="input-group-text bg-body-secondary"><i class="bi bi-search text-muted"></i></span>',
      )
    },
  })

  return table
}
