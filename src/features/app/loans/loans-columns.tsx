import type { ColumnDef } from '@tanstack/react-table'
import { CheckCircle2, Loader } from 'lucide-react'

import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/lib/column-labels'
import { cn } from '@/lib/utils'

import { status, studentDnis } from './options-data.ts'
import { Loan } from './schema.ts'

const resource = 'loans'

export const columns: ColumnDef<Loan>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'LoanID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'LoanID')} />
    ),
  },
  {
    accessorKey: 'BookTitle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'BookTitle')} />
    ),
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'StudentDNI',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'StudentDNI')} />
    ),
    meta: {
      filter: {
        title: getColumnLabel(resource, 'StudentDNI'),
        options: studentDnis,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'LoanDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'LoanDate')} />
    ),
    meta: {
      dateRangeFilter: true,
    },
    cell: ({ row }) => {
      const loanDate = new Date(row.getValue('LoanDate'))
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
        .format(loanDate)
        .replace('.', '')
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id))
      const [startDate, endDate] = value
      return rowDate >= startDate && rowDate <= endDate
    },
  },
  {
    accessorKey: 'ReturnDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'ReturnDate')} />
    ),
    meta: {
      dateRangeFilter: true,
    },
    cell: ({ row }) => {
      const returnDate = new Date(row.getValue('ReturnDate'))
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
        .format(returnDate)
        .replace('.', '')
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id))
      const [startDate, endDate] = value
      return rowDate >= startDate && rowDate <= endDate
    },
  },
  {
    accessorKey: 'Quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Quantity')} />
    ),
    cell: ({ row }) => {
      const quantity = row.getValue('Quantity') as number
      return <Badge variant="outline">{quantity}</Badge>
    },
  },
  {
    accessorKey: 'Status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Status')} />
    ),
    meta: {
      filter: {
        title: getColumnLabel(resource, 'Status'),
        options: status,
      },
    },
    cell: ({ row }) => {
      const loanStatus = row.getValue('Status') as Loan['Status']
      const Icon = loanStatus === 'devuelto' ? CheckCircle2 : Loader

      return (
        <Badge variant="outline" className="capitalize flex items-center gap-1">
          <Icon
            className={cn(
              'w-4 h-4',
              loanStatus === 'prestado' ? '' : 'text-green-500 dark:text-green-400'
            )}
          />
          {loanStatus}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: () => <DataTableRowActions />,
  },
]
