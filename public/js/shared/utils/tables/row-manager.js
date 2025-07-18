import { initializeTooltips } from '../ui/index.js'

export function addRowToTable(entity, generateRowFn) {
  if (typeof generateRowFn !== 'function') {
    console.error('[addRowToTable] generateRowFn debe ser una función.')
    return
  }

  const rowHtml = generateRowFn(entity)
  if (typeof rowHtml !== 'string') {
    console.error('[addRowToTable] generateRowFn debe retornar un string con HTML.')
    return
  }

  const table = $('#table').DataTable()
  const $row = $(rowHtml)

  table.row.add($row).draw(false)
  table.page('first').draw(false)

  initializeTooltips($row)
}

export function updateRowInTable({ entity, getFormattedId, updateCellsFn }) {
  if (!entity || typeof getFormattedId !== 'function' || typeof updateCellsFn !== 'function') {
    console.error(
      `updateRowInTable: Invalid arguments.
			- entity: ${typeof entity}
			- getFormattedId: ${typeof getFormattedId}
			- updateCellsFn: ${typeof updateCellsFn}`,
    )
    return
  }

  const table = $('#table').DataTable()
  if (!table) {
    console.error('updateRowInTable: DataTable instance not found.')
    return
  }

  const id = getFormattedId(entity)
  if (typeof id !== 'string') {
    console.error('updateRowInTable: getFormattedId must return a string.')
    return
  }

  const row = table
    .rows()
    .nodes()
    .to$()
    .filter(function () {
      return $(this).find('td').eq(0).text().trim() === id
    })

  if (row.length > 0) {
    try {
      updateCellsFn(row, entity)
      table.row(row).invalidate().draw(false)
      initializeTooltips(row)
    } catch (err) {
      console.error('updateRowInTable: Failed to update row cells.', err)
    }
  } else {
    console.warn(`updateRowInTable: No matching row found with id "${id}".`)
  }
}
