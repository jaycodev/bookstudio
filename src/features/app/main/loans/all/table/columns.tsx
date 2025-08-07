import type { ColumnDef } from '@tanstack/react-table'
import { BookCopy, BookOpenText, Calendar, Handshake } from 'lucide-react'

import { Badge } from '@/components/ui/badge.tsx'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'

import { statusIconsAndLabels } from '../config/status-icons.ts'
import { readersOptions, statusOptions } from '../data/options-data.ts'
import { LoanList } from '../schema/loan.schema.ts'

const resource = 'loans'

export const columns: ColumnDef<LoanList>[] = [
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
          <Handshake className="mr-1" />
          {code}
        </Badge>
      )
    },
    meta: {
      searchable: true,
    },
  },
  {
    accessorKey: 'readerCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'readerCode')} />
    ),
    cell: ({ row }) => {
      const code = row.getValue<string>('readerCode')
      return (
        <Badge variant="outline" className="font-mono">
          <BookOpenText className="mr-1" />
          {code}
        </Badge>
      )
    },
    meta: {
      filter: {
        title: getColumnLabel(resource, 'readerFullName'),
        options: readersOptions,
      },
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'readerFullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'readerFullName')} />
    ),
  },
  {
    accessorKey: 'loanDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'loanDate')} />
    ),
    meta: {
      dateRangeFilter: true,
      headerClass: 'text-center',
      cellClass: 'text-center',
    },
    cell: ({ row }) => {
      const loanDate = new Date(row.getValue('loanDate'))
      const formatted = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
        .format(loanDate)
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
    accessorKey: 'itemCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'itemCount')} />
    ),
    cell: ({ row }) => {
      const value = row.getValue('itemCount') as number
      return (
        <Badge variant="outline">
          <BookCopy className="mr-1" />
          {value}
        </Badge>
      )
    },
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
    },
  },
  {
    accessorKey: 'statusCounts',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'statusCounts')} />
    ),
    cell: ({ row }) => {
      const statusCounts = row.getValue<typeof row.original.statusCounts>('statusCounts')

      return (
        <TooltipProvider>
          <div className="flex gap-1 justify-center">
            {Object.entries(statusCounts)
              .filter(([, count]) => count > 0)
              .map(([key, count]) => {
                const status = statusIconsAndLabels[key as keyof typeof statusIconsAndLabels]
                if (!status) return null

                const Icon = status.icon
                return (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <Badge variant={status.variant}>
                        <Icon className="mr-1" />
                        {count}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="top">{status.label}</TooltipContent>
                  </Tooltip>
                )
              })}
          </div>
        </TooltipProvider>
      )
    },
    enableSorting: false,
    meta: {
      headerClass: 'text-center',
      cellClass: 'text-center',
      filter: {
        title: getColumnLabel(resource, 'statusCounts'),
        options: statusOptions,
      },
    },
    filterFn: (row, id, value) => {
      const statusCounts = row.getValue<typeof row.original.statusCounts>(id)

      return (value as (keyof typeof statusCounts)[]).some((status) => statusCounts?.[status] > 0)
    },
  },
  {
    id: 'actions',
    cell: () => <DataTableRowActions />,
  },
]
