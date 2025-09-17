import type { ColumnDef } from '@tanstack/react-table'
import { KeyRound } from 'lucide-react'

import { Badge } from '@/components/ui/badge.tsx'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'

import { RoleList } from '../schema/list.schema.ts'

const resource = 'roles'

export const columns: ColumnDef<RoleList>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ getValue }) => {
      return <span className="truncate block max-w-[60rem] text-sm">{getValue<string>()}</span>
    },
    enableSorting: false,
  },
  {
    id: 'permissions',
    accessorFn: (row) => row.permissionCount,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ getValue }) => {
      const value = getValue<number>()
      const displayValue = value === 0 ? '-' : value
      const variant = value === 0 ? 'muted' : 'warning'

      return (
        <Badge variant={variant}>
          <KeyRound className="mr-1" />
          {displayValue}
        </Badge>
      )
    },
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
    },
  },
  {
    id: 'actions',
    cell: () => <DataTableRowActions />,
  },
]
