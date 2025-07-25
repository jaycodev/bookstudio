import type { ColumnDef } from '@tanstack/react-table'
import { CheckCircle2, XCircle } from 'lucide-react'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/lib/column-labels'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils'

import { genres, nationalities, status } from './options-data.ts'
import { Publisher } from './schema.ts'

const resource = 'publishers'

export const columns: ColumnDef<Publisher>[] = [
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
    accessorKey: 'PublisherID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'PublisherID')} />
    ),
  },
  {
    accessorKey: 'Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Name')} />
    ),
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'NationalityName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'NationalityName')} />
    ),
    meta: {
      filter: {
        title: getColumnLabel(resource, 'NationalityName'),
        options: nationalities,
      },
    },
    cell: ({ row }) => {
      const nationality = row.getValue('NationalityName') as string
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          {nationality}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'LiteraryGenreName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={getColumnLabel(resource, 'LiteraryGenreName')}
      />
    ),
    meta: {
      filter: {
        title: getColumnLabel(resource, 'LiteraryGenreName'),
        options: genres,
      },
    },
    cell: ({ row }) => {
      const genre = row.getValue('LiteraryGenreName') as string
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          {genre}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
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
      const status = row.getValue('Status') as Publisher['Status']
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
    accessorKey: 'Photo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Photo')} />
    ),
    cell: ({ row }) => {
      const photo = row.getValue('Photo') as string | undefined
      const name = row.getValue('Name') as string

      return (
        <Avatar className="h-8 w-8">
          {photo ? (
            <AvatarImage src={photo} alt={name} className="object-cover" />
          ) : (
            <AvatarFallback className="text-xs">{getInitials(name)}</AvatarFallback>
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
