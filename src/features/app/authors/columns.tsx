import type { ColumnDef } from '@tanstack/react-table'
import { CheckCircle2, XCircle } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'
import { getColumnLabel } from '@/lib/column-labels'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils'

import { literaryGenres, nationalities, status } from './options-data.ts'
import { Author } from './schema.ts'

const resource = 'authors'

export const columns: ColumnDef<Author>[] = [
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
    accessorKey: 'AuthorID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'AuthorID')} />
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
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
        options: literaryGenres,
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
      const status = row.getValue('Status') as Author['Status']
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
