import type { ColumnDef } from '@tanstack/react-table'
import { Calendar, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { statusBadges } from '@/features/app/components/badges/status.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'

import { nationalitiesOptions, statusOptions } from '../data/options-data.ts'
import { AuthorList } from '../schema/list.schema.ts'

const resource = 'authors'

export const columns: ColumnDef<AuthorList>[] = [
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
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'name')} />
    ),
    cell: ({ row }) => {
      const name = row.getValue<string>('name')
      const photoUrl = row.original.photoUrl

      return (
        <div className="flex items-center gap-2">
          <Avatar className="rounded-sm">
            {photoUrl ? (
              <AvatarImage src={photoUrl} alt={name} className="object-cover" />
            ) : (
              <AvatarFallback className="text-xs object-cover rounded-sm">
                <User className="size-5 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <span>{name}</span>
        </div>
      )
    },
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'nationalityCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'nationalityCode')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('nationalityCode')
      const name = row.original.nationalityName

      return (
        <Badge variant="outline">
          <img src={`https://flagcdn.com/w20/${code}.jpg`} alt={name} className="w-4 h-auto mr-1" />
          {name}
        </Badge>
      )
    },
    enableSorting: false,
    meta: {
      filter: {
        title: getColumnLabel(resource, 'nationalityCode'),
        options: nationalitiesOptions,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'birthDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'birthDate')} />
    ),
    meta: {
      dateRangeFilter: true,
      headerClass: 'text-center',
      cellClass: 'text-center',
    },
    cell: ({ row }) => {
      const birthDate = new Date(row.getValue('birthDate'))
      const formatted = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
        .format(birthDate)
        .replace('.', '')

      return (
        <Badge variant="outline">
          <Calendar className="mr-1" />
          {formatted}
        </Badge>
      )
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
      const status = row.getValue<keyof typeof statusBadges>('status')
      const meta = statusBadges[status]

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
