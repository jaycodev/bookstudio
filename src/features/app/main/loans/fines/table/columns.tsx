import type { ColumnDef } from '@tanstack/react-table'
import { BookText, Calendar, Handshake, History, OctagonAlert } from 'lucide-react'

import { Badge } from '@/components/ui/badge.tsx'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'

import { statusIconsAndLabels } from '../config/status-icons.ts'
import { loansOptions, statusOptions } from '../data/options-data.ts'
import type { FineList } from '../schema/list.schema.ts'

const resource = 'fines'

export const columns: ColumnDef<FineList>[] = [
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
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'code')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('code')
      return (
        <Badge variant="outline" className="font-mono">
          <OctagonAlert className="mr-1" />
          {code}
        </Badge>
      )
    },
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'loanCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'loanCode')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('loanCode')
      return (
        <Badge variant="outline" className="font-mono">
          <Handshake className="mr-1" />
          {code}
        </Badge>
      )
    },
    meta: {
      filter: {
        title: getColumnLabel(resource, 'loanCode'),
        options: loansOptions,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'copyCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'copyCode')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('copyCode')
      return (
        <Badge variant="outline" className="font-mono">
          <BookText className="mr-1" />
          {code}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'amount')} />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>('amount')
      const formatted = `S/. ${amount.toFixed(2)}`
      return <Badge variant="outline">{formatted}</Badge>
    },
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
    },
  },
  {
    accessorKey: 'daysLate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'daysLate')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('daysLate')
      return (
        <Badge variant="outline">
          <History className="mr-1" />
          {code}
        </Badge>
      )
    },
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
    },
  },
  {
    accessorKey: 'issuedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'issuedAt')} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('issuedAt'))
      const formatted = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
        .format(date)
        .replace('.', '')

      return (
        <Badge variant="outline">
          <Calendar className="mr-1" />
          {formatted}
        </Badge>
      )
    },
    meta: {
      dateRangeFilter: true,
      headerClass: 'text-center',
      cellClass: 'text-center',
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id))
      const [startDate, endDate] = value
      return rowDate >= startDate && rowDate <= endDate
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'status')} />
    ),
    cell: ({ row }) => {
      const status = row.getValue<keyof typeof statusIconsAndLabels>('status')
      const meta = statusIconsAndLabels[status]

      if (!meta) return null
      const Icon = meta.icon

      return (
        <Badge variant={meta.variant}>
          <Icon className="mr-1" />
          {meta.label}
        </Badge>
      )
    },
    enableSorting: false,
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
      filter: {
        title: getColumnLabel(resource, 'status'),
        options: statusOptions,
      },
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
