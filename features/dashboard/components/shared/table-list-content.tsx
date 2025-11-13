'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@dashboard/components/data-table/data-table'
import { DataTableSkeleton } from '@dashboard/components/data-table/data-table-skeleton'

interface TableListContentProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  resource: string
  filterCount?: number
  dateRangeCount?: number
}

function getFilterCount<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  filterCount: number | undefined
): number {
  if (filterCount !== undefined) return filterCount
  return columns.filter((col) => {
    const meta = col.meta as Record<string, unknown> | undefined
    return meta?.filter && !meta?.dateRangeFilter
  }).length
}

function getDateRangeCount<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  dateRangeCount: number | undefined
): number {
  if (dateRangeCount !== undefined) return dateRangeCount
  return columns.filter((col) => {
    const meta = col.meta as Record<string, unknown> | undefined
    return meta?.dateRangeFilter
  }).length
}

export function TableListContent<TData, TValue>({
  columns,
  data,
  resource,
  filterCount,
  dateRangeCount,
}: TableListContentProps<TData, TValue>) {
  const computedFilterCount = getFilterCount(columns, filterCount)
  const computedDateRangeCount = getDateRangeCount(columns, dateRangeCount)

  const isLoading = data === undefined

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton
          columnCount={columns.length}
          filterCount={computedFilterCount}
          dateRangeCount={computedDateRangeCount}
        />
      ) : (
        <DataTable columns={columns} data={data ?? []} resource={resource} />
      )}
    </>
  )
}
