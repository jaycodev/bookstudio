export function getColumnCount(columns: unknown[]): number {
  if (!Array.isArray(columns)) return 0
  return columns.length
}

export function getFilterCount(columns: unknown[]): number {
  if (!Array.isArray(columns)) return 0
  return columns.filter((col) => {
    const meta = (col as Record<string, unknown>)?.meta
    if (!meta || typeof meta !== 'object') return false
    const metaObj = meta as Record<string, unknown>
    return (metaObj.filter === true || metaObj.filterFn !== undefined) && !metaObj.dateRangeFilter
  }).length
}

export function getDateRangeCount(columns: unknown[]): number {
  if (!Array.isArray(columns)) return 0
  return columns.filter((col) => {
    const meta = (col as Record<string, unknown>)?.meta
    if (!meta || typeof meta !== 'object') return false
    return (meta as Record<string, unknown>).dateRangeFilter === true
  }).length
}
