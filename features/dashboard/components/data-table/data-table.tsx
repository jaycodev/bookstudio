'use client'

import * as React from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { CirclePlus, FileSpreadsheet, FileX } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Button } from '@components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { cn } from '@lib/utils'
import { sidebarMap } from '@dashboard/components/sidebar'

import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

const createSmartFilter = () => {
  return (row: any, columnId: string, filterValue: string) => {
    if (!filterValue) return true

    const cellValue = row.getValue(columnId)
    if (cellValue === null) return false

    const normalizedCellValue = normalizeText(String(cellValue))
    const normalizedFilterValue = normalizeText(String(filterValue))

    return normalizedCellValue.includes(normalizedFilterValue)
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  resource: string
  title?: string
  description?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  resource,
  title = 'Listado',
  description = 'Esta es la información disponible en la tabla.',
}: DataTableProps<TData, TValue>) {
  const pathname = usePathname()
  const sidebarMeta = sidebarMap[pathname as keyof typeof sidebarMap]
  const Icon = sidebarMeta?.icon

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const enhancedColumns = React.useMemo(() => {
    return columns.map((column) => {
      if (column.meta?.searchable) {
        return {
          ...column,
          filterFn: createSmartFilter(),
        }
      }
      return column
    })
  }, [columns])

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
  })

  return (
    <div className="space-y-4">
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {Icon && <Icon strokeWidth={2.5} />}
            {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileX className="text-green-500 dark:text-green-400" />
            Excel
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="text-destructive" />
            PDF
          </Button>
          <Button>
            <CirclePlus />
            Agregar
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-2 w-full"></div>
      <DataTableToolbar table={table} resource={resource} />
      <div className="overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn('px-4', header.column.columnDef.meta?.headerClass)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn('px-4', cell.column.columnDef.meta?.cellClass)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-14 text-center">
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
