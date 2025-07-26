import type { ColumnDef } from '@tanstack/react-table'
import { CheckCircle2, XCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'
import { cn } from '@/lib/utils'

import { authors, publishers, status } from '../data/options-data.ts'
import { Book } from '../schema/book.schema.ts'

const resource = 'books'

export const columns: ColumnDef<Book>[] = [
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
    accessorKey: 'BookID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'BookID')} />
    ),
  },
  {
    accessorKey: 'Title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Title')} />
    ),
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'AvailableCopies',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'AvailableCopies')} />
    ),
    cell: ({ row }) => {
      const value = row.getValue('AvailableCopies') as number
      return <Badge variant="outline">{value}</Badge>
    },
  },
  {
    accessorKey: 'LoanedCopies',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'LoanedCopies')} />
    ),
    cell: ({ row }) => {
      const value = row.getValue('LoanedCopies') as number
      return <Badge variant="outline">{value}</Badge>
    },
  },
  {
    accessorKey: 'AuthorName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'AuthorName')} />
    ),
    meta: {
      filter: {
        title: getColumnLabel(resource, 'AuthorName'),
        options: authors,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'PublisherName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'PublisherName')} />
    ),
    meta: {
      filter: {
        title: getColumnLabel(resource, 'PublisherName'),
        options: publishers,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
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
      const status = row.getValue('Status') as Book['Status']
      const Icon = status === 'activo' ? CheckCircle2 : XCircle

      return (
        <Badge variant="outline" className="capitalize flex items-center gap-1">
          <Icon
            className={cn(
              'w-4 h-4',
              status === 'activo' ? 'text-green-500 dark:text-green-400' : 'text-destructive'
            )}
          />
          {status}
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
