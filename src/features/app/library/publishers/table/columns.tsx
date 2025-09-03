import type { ColumnDef } from '@tanstack/react-table'
import { Building2, MapPin } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'

import { statusIconsAndLabels } from '../config/status-icons.ts'
import { nationalitiesOptions, statusOptions } from '../data/options-data.ts'
import { PublisherList } from '../schema/list.schema.ts'

const resource = 'publishers'

export const columns: ColumnDef<PublisherList>[] = [
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
                <Building2 className="size-5 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <span className="truncate max-w-[14rem] text-sm leading-snug break-words">{name}</span>
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
    accessorKey: 'website',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'website')} />
    ),
    cell: ({ row }) => {
      let website = row.getValue('website') as string | null

      if (!website) return null

      if (!/^https?:\/\//i.test(website)) {
        website = `https://${website}`
      }

      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {row.getValue('website') as string}
          </a>
        </Badge>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'address')} />
    ),
    cell: ({ row }) => {
      const address = row.getValue('address') as string
      return (
        <Badge variant="outline">
          <MapPin className="mr-1" />
          {address}
        </Badge>
      )
    },
    enableSorting: false,
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
