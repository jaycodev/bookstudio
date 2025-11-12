'use client'

import * as React from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { CirclePlus, FileSpreadsheet, FileX } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { DataTable } from '@dashboard/components/data-table/data-table'
import { DataTableSkeleton } from '@dashboard/components/data-table/data-table-skeleton'
import { Breadcrumbs } from '@dashboard/components/shared/breadcrumbs'
import { sidebarMap } from '@dashboard/components/sidebar/sidebar-map'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

interface TableListPageProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  resource: string
  title: string
  description: string
  initialLoadingTime?: number
}

export function TableListPage<TData, TValue>({
  columns,
  data,
  resource,
  title,
  description,
  initialLoadingTime = 1000,
}: TableListPageProps<TData, TValue>) {
  const pathname = usePathname()
  const sidebarMeta = sidebarMap[pathname as keyof typeof sidebarMap]
  const Icon = sidebarMeta?.icon

  const filterCount = React.useMemo(() => {
    return columns.filter((col) => {
      const meta = col.meta as Record<string, unknown> | undefined
      return meta?.filter && !meta?.dateRangeFilter
    }).length
  }, [columns])

  const dateRangeCount = React.useMemo(() => {
    return columns.filter((col) => {
      const meta = col.meta as Record<string, unknown> | undefined
      return meta?.dateRangeFilter
    }).length
  }, [columns])

  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, initialLoadingTime)

    return () => clearTimeout(timer)
  }, [initialLoadingTime])

  return (
    <>
      <Breadcrumbs />
      <div className="space-y-4">
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {Icon && <Icon strokeWidth={2.5} />}
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className={`flex gap-2 ${isLoading ? 'cursor-wait' : ''}`}>
            <Button variant="outline" disabled={isLoading}>
              {isLoading ? <Spinner /> : <FileX className="text-green-500 dark:text-green-400" />}
              Excel
            </Button>
            <Button variant="outline" disabled={isLoading}>
              {isLoading ? <Spinner /> : <FileSpreadsheet className="text-destructive" />}
              PDF
            </Button>
            <Button disabled={isLoading}>
              {isLoading ? <Spinner /> : <CirclePlus />}
              Agregar
            </Button>
          </div>
        </div>
        {isLoading ? (
          <DataTableSkeleton
            columnCount={columns.length}
            filterCount={filterCount}
            dateRangeCount={dateRangeCount}
          />
        ) : (
          <DataTable columns={columns} data={data} resource={resource} />
        )}
      </div>
    </>
  )
}
