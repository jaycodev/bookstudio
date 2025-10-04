'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Archive, BookText, Boxes, Layers, MapPin } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Badge } from '@components/ui/badge'
import { Checkbox } from '@components/ui/checkbox'
import { withMetaLabelFilter } from '@lib/with-meta-label-filter'
import { withMetaLabelHeader } from '@lib/with-meta-label-header'
import { DataTableRowActions } from '@dashboard/components/data-table'

import { conditionBadges, statusBadges } from './badges'
import type { CopyList } from './list.schema'
import { booksOptions, conditionsOptions, statusOptions } from './options-data'

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
    header: withMetaLabelHeader<CopyList>(),
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
    header: withMetaLabelHeader<CopyList>(),
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
    meta: withMetaLabelFilter<CopyList>({
      columnId: 'book',
      options: booksOptions,
    }),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'shelf',
    accessorFn: (row) => String(row.shelf.code),
    header: withMetaLabelHeader<CopyList>(),
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
    header: withMetaLabelHeader<CopyList>(),
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
    header: withMetaLabelHeader<CopyList>(),
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
    header: withMetaLabelHeader<CopyList>(),
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
      ...withMetaLabelFilter<CopyList>({
        columnId: 'status',
        options: statusOptions,
      }),
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)))
    },
  },
  {
    accessorKey: 'condition',
    header: withMetaLabelHeader<CopyList>(),
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
      ...withMetaLabelFilter<CopyList>({
        columnId: 'condition',
        options: conditionsOptions,
      }),
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
