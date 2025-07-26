import type { ColumnDef } from '@tanstack/react-table'
import { CheckCircle2, XCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'
import { cn } from '@/lib/utils'

import { status } from '../data/options-data.ts'
import { Reader } from '../schema/reader.schema.ts'

const resource = 'students'

export const columns: ColumnDef<Reader>[] = [
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
    accessorKey: 'StudentID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'StudentID')} />
    ),
  },
  {
    accessorKey: 'DNI',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'DNI')} />
    ),
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'FirstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'FirstName')} />
    ),
  },
  {
    accessorKey: 'LastName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'LastName')} />
    ),
  },
  {
    accessorKey: 'Phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Phone')} />
    ),
  },
  {
    accessorKey: 'Email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Email')} />
    ),
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
      const status = row.getValue('Status') as Reader['Status']
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
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'actions',
    cell: () => <DataTableRowActions />,
  },
]
