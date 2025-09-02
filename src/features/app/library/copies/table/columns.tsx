import type { ColumnDef } from '@tanstack/react-table'
import { Archive, BookText, Boxes, CheckCircle2, Layers, MapPin, XCircle } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge.tsx'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'

import { conditionsIconsAndLabels } from '../config/conditions-icons.ts'
import { availabilityOptions, booksOptions, conditionsOptions } from '../data/options-data.ts'
import type { CopyList } from '../schema/copy.schema.ts'

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
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'code')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('code')
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
    accessorKey: 'bookTitle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'bookTitle')} />
    ),
    cell: ({ row }) => {
      const bookTitle = row.getValue<string>('bookTitle')
      const bookCoverUrl = row.original.bookCoverUrl

      return (
        <div className="flex items-center gap-2">
          <Avatar className="rounded-sm">
            {bookCoverUrl ? (
              <AvatarImage src={bookCoverUrl} alt={bookTitle} className="object-cover" />
            ) : (
              <AvatarFallback className="text-xs object-cover rounded-sm">
                <BookText className="size-5 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <span className="truncate max-w-[14rem] text-sm leading-snug break-words">
            {bookTitle}
          </span>
        </div>
      )
    },
    meta: {
      filter: {
        title: getColumnLabel(resource, 'bookTitle'),
        options: booksOptions,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'shelfCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'shelfCode')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('shelfCode')
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
    accessorKey: 'shelfFloor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'shelfFloor')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('shelfFloor')
      return (
        <Badge variant="outline">
          <Layers className="mr-1" />
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
    accessorKey: 'locationName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'locationName')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('locationName')
      return (
        <Badge variant="outline">
          <MapPin className="mr-1" />
          {code}
        </Badge>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'isAvailable',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'isAvailable')} />
    ),
    cell: ({ row }) => {
      const available = row.getValue<boolean>('isAvailable')
      const Icon = available ? CheckCircle2 : XCircle

      return (
        <Badge variant="outline" className="gap-1">
          <Icon
            className={
              available ? 'mr-1 text-green-500 dark:text-green-400' : 'mr-1 text-destructive'
            }
          />
          {available ? 'Sí' : 'No'}
        </Badge>
      )
    },
    enableSorting: false,
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
      filter: {
        title: getColumnLabel(resource, 'isAvailable'),
        options: availabilityOptions,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)))
    },
  },
  {
    accessorKey: 'condition',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'condition')} />
    ),
    cell: ({ row }) => {
      const condition = row.getValue<keyof typeof conditionsIconsAndLabels>('condition')
      const meta = conditionsIconsAndLabels[condition]

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
