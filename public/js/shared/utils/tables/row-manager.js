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

  const table = new DataTable('#table')
  const tempContainer = document.createElement('tbody')
  tempContainer.innerHTML = rowHtml
  const rowElement = tempContainer.firstElementChild

  table.row.add(rowElement).draw(false)
  table.page('first').draw(false)

  initializeTooltips(rowElement)
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

  const table = new DataTable('#table')
  if (!table) {
    console.error('updateRowInTable: DataTable instance not found.')
    return
  }

  const id = getFormattedId(entity)
  if (typeof id !== 'string') {
    console.error('updateRowInTable: getFormattedId must return a string.')
    return
  }

  const rows = table.rows().nodes().toArray()
  const matchingRow = rows.find((row) => {
    const firstCellText = row.querySelector('td')?.textContent?.trim()
    return firstCellText === id
  })

  if (matchingRow) {
    try {
      updateCellsFn(matchingRow, entity)
      table.row(matchingRow).invalidate().draw(false)
      initializeTooltips(matchingRow)
    } catch (err) {
      console.error('updateRowInTable: Failed to update row cells.', err)
    }
  } else {
    console.warn(`updateRowInTable: No matching row found with id "${id}".`)
  }
}
