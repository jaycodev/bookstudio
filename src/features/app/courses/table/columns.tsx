import type { ColumnDef } from '@tanstack/react-table'
import { CheckCircle2, XCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { getColumnLabel } from '@/config/column-labels.ts'
import { DataTableColumnHeader } from '@/features/app/components/data-table/data-table-column-header.tsx'
import { DataTableRowActions } from '@/features/app/components/data-table/data-table-row-actions.tsx'
import { cn } from '@/lib/utils'

import { levels, status } from '../data/options-data.ts'
import { Course } from '../schema/course.schema.ts'

const resource = 'courses'

export const columns: ColumnDef<Course>[] = [
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
    accessorKey: 'CourseID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'CourseID')} />
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
    accessorKey: 'Level',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Level')} />
    ),
    meta: {
      filter: {
        title: getColumnLabel(resource, 'Level'),
        options: levels,
      },
    },
    cell: ({ row }) => {
      const nationality = row.getValue('Level') as string
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
    accessorKey: 'Description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={getColumnLabel(resource, 'Description')} />
    ),
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
      const courseStatus = row.getValue('Status') as Course['Status']
      const Icon = courseStatus === 'activo' ? CheckCircle2 : XCircle

      return (
        <Badge variant="outline" className="capitalize flex items-center gap-1">
          <Icon
            className={cn(
              'w-4 h-4',
              courseStatus === 'activo' ? 'text-green-500 dark:text-green-400' : 'text-destructive'
            )}
          />
          {courseStatus}
        </Badge>
      )
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
