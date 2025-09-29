'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Archive, BookText, Boxes, Layers, MapPin } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels'
import { DataTableColumnHeader } from '@/features/dashboard/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/features/dashboard/components/data-table/data-table-row-actions'

import { conditionBadges } from '../components/badges/condition'
import { statusBadges } from '../components/badges/status'
import { booksOptions, conditionsOptions, statusOptions } from '../data/options-data'
import type { CopyList } from '../schema/list.schema'

const resource = 'copies'

export const columns: ColumnDef<CopyList>[] = [
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
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ getValue }) => {
      const code = getValue<string>()
      return (
        <Badge variant="outline" className="font-mono">
          <Boxes className="mr-1" />
          {code}
        </Badge>
      )
    },
    meta: {
      searchable: true,
    },
  },
  {
    id: 'book',
    accessorFn: (row) => String(row.book.id),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ row }) => {
      const title = row.original.book.title
      const coverUrl = row.original.book.coverUrl

      return (
        <div className="flex items-center gap-2">
          <Avatar className="rounded-sm">
            {coverUrl ? (
              <AvatarImage src={coverUrl} alt={title} className="object-cover" />
            ) : (
              <AvatarFallback className="text-xs object-cover rounded-sm">
                <BookText className="size-5 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <span className="truncate max-w-[14rem] text-sm leading-snug break-words">{title}</span>
        </div>
      )
    },
    meta: {
      filter: {
        title: getColumnLabel(resource, 'book'),
        options: booksOptions,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'shelf',
    accessorFn: (row) => String(row.shelf.code),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ getValue }) => {
      const code = getValue<string>()
      return (
        <Badge variant="outline" className="font-mono">
          <Archive className="mr-1" />
          {code}
        </Badge>
      )
    },
    enableSorting: false,
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
    },
  },
  {
    id: 'floor',
    accessorFn: (row) => String(row.shelf.floor),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ getValue }) => {
      const floor = getValue<string>()
      return (
        <Badge variant="outline">
          <Layers className="mr-1" />
          {floor}
        </Badge>
      )
    },
    enableSorting: false,
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
    },
  },
  {
    id: 'location',
    accessorFn: (row) => String(row.location.name),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ getValue }) => {
      const name = getValue<string>()
      return (
        <Badge variant="outline">
          <MapPin className="mr-1" />
          {name}
        </Badge>
      )
    },
    enableSorting: false,
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
    accessorKey: 'condition',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, column.id)} />
    ),
    cell: ({ row }) => {
      const meta = conditionBadges[row.original.condition]

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
        title: getColumnLabel(resource, 'condition'),
        options: conditionsOptions,
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
