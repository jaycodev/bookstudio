import type { ColumnDef } from '@tanstack/react-table'
import { CheckCircle2 } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'
import { getColumnLabel } from '@/lib/column-labels'
import { getInitials } from '@/lib/utils'

import { roles } from './options-data.ts'
import { User } from './schema.ts'

const resource = 'users'

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'UserID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'UserID')} />
    ),
  },
  {
    accessorKey: 'Username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Username')} />
    ),
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'Email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Email')} />
    ),
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
    accessorKey: 'Role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Role')} />
    ),
    meta: {
      filter: {
        title: getColumnLabel(resource, 'Role'),
        options: roles,
      },
    },
    cell: ({ row }) => {
      const role = row.getValue('Role') as User['Role']
      const option = roles.find((r) => r.value === role)
      const Icon = option?.icon ?? CheckCircle2

      return (
        <Badge variant="outline" className="capitalize flex items-center gap-1">
          <Icon className="w-4 h-4" />
          {role}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'ProfilePhoto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'ProfilePhoto')} />
    ),
    cell: ({ row }) => {
      const photo = row.getValue('ProfilePhoto') as string | undefined
      const firstName = (row.getValue('FirstName') as string).split(' ')[0]
      const lastName = (row.getValue('LastName') as string).split(' ')[0]
      const fullName = `${firstName} ${lastName}`

      return (
        <Avatar className="h-8 w-8">
          {photo ? (
            <AvatarImage src={photo} alt={fullName} className="object-cover" />
          ) : (
            <AvatarFallback className="text-xs">{getInitials(fullName)}</AvatarFallback>
          )}
        </Avatar>
      )
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: () => <DataTableRowActions />,
  },
]
