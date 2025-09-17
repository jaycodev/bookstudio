import type { ColumnDef } from '@tanstack/react-table'
import { Mail, ShieldCheck } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'
import { getInitials } from '@/lib/utils.ts'

import { statusBadges } from '../components/badges/status.ts'
import { rolesOptions, statusOptions } from '../data/options-data.ts'
import { WorkerList } from '../schema/list.schema.ts'

const resource = 'workers'

export const columns: ColumnDef<WorkerList>[] = [
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
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ getValue, row }) => {
      const username = getValue<string>()
      const fullName = row.original.fullName
      const photoUrl = row.original.profilePhotoUrl

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            {photoUrl ? (
              <AvatarImage src={photoUrl} alt={`Foto de ${fullName}`} className="object-cover" />
            ) : (
              <AvatarFallback className="text-xs">{getInitials(fullName)}</AvatarFallback>
            )}
          </Avatar>
          <span>{username}</span>
        </div>
      )
    },
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ getValue }) => {
      const email = getValue<string>()
      return (
        <Badge variant="outline">
          <Mail className="mr-1" />
          <a href={`mailto:${email}`} className="hover:underline">
            {email}
          </a>
        </Badge>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
  },
  {
    id: 'role',
    accessorFn: (row) => String(row.role.id),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ row }) => {
      const name = row.original.role.name
      return (
        <Badge variant="outline">
          <ShieldCheck className="mr-1" />
          {name}
        </Badge>
      )
    },
    enableSorting: false,
    meta: {
      filter: {
        title: getColumnLabel(resource, 'role'),
        options: rolesOptions,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ row }) => {
      const meta = statusBadges[row.original.status]

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
      return value.includes(String(row.getValue(id)))
    },
  },
  {
    id: 'actions',
    cell: () => <DataTableRowActions />,
  },
]
