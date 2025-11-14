import { ReactNode, Suspense } from 'react'

import { CirclePlus, FileSpreadsheet, FileX } from 'lucide-react'

import type { DataTableSkeletonProps } from '@dashboard/components/data-table/data-table-skeleton'
import { DataTableSkeleton } from '@dashboard/components/data-table/data-table-skeleton'
import { Breadcrumbs } from '@dashboard/components/shared/breadcrumbs'
import { sidebarMap } from '@dashboard/components/sidebar/sidebar-map'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

interface TableListLayoutProps {
  title: string
  description: string
  pathname: string
  children: ReactNode
  skeletonConfig?: Partial<DataTableSkeletonProps>
}

function TableListContent({
  title,
  description,
  pathname,
  children,
  isLoading = false,
}: {
  title: string
  description: string
  pathname: string
  children: ReactNode
  isLoading?: boolean
}) {
  const sidebarMeta = sidebarMap[pathname as keyof typeof sidebarMap]
  const Icon = sidebarMeta?.icon

  return (
    <>
      <Breadcrumbs pathname={pathname} />
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
        {children}
      </div>
    </>
  )
}

export function TableListLayout({
  title,
  description,
  pathname,
  children,
  skeletonConfig,
}: TableListLayoutProps) {
  const commonProps = { title, description, pathname }

  const resolvedSkeletonConfig: DataTableSkeletonProps = {
    columnCount: 6,
    filterCount: 2,
    dateRangeCount: 1,
    ...skeletonConfig,
  }

  return (
    <Suspense
      fallback={
        <TableListContent {...commonProps} isLoading={true}>
          <DataTableSkeleton {...resolvedSkeletonConfig} />
        </TableListContent>
      }
    >
      <TableListContent {...commonProps} isLoading={false}>
        {children}
      </TableListContent>
    </Suspense>
  )
}
