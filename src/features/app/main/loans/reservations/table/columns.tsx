import type { ColumnDef } from '@tanstack/react-table'
import { BookOpenText, BookText, Calendar, Calendar1 } from 'lucide-react'

import { Badge } from '@/components/ui/badge.tsx'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'

import { statusIconsAndLabels } from '../config/status-icons.ts'
import { readersOptions, statusOptions } from '../data/options-data.ts'
import type { ReservationList } from '../schema/reservation.schema.ts'

const resource = 'reservations'

export const columns: ColumnDef<ReservationList>[] = [
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
          <Calendar1 className="mr-1" />
          {code}
        </Badge>
      )
    },
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'readerCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'readerCode')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('readerCode')
      return (
        <Badge variant="outline" className="font-mono">
          <BookOpenText className="mr-1" />
          {code}
        </Badge>
      )
    },
    meta: {
      filter: {
        title: getColumnLabel(resource, 'readerFullName'),
        options: readersOptions,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'readerFullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'readerFullName')} />
    ),
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
    accessorKey: 'reservationDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'reservationDate')} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('reservationDate'))
      const formatted = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
        .format(date)
        .replace('.', '')

      return (
        <Badge variant="outline">
          <Calendar />
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
          <Icon />
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
