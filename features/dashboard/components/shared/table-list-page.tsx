import { ColumnDef } from '@tanstack/react-table'

import { Breadcrumbs } from '@dashboard/components/shared/breadcrumbs'
import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListHeader } from '@dashboard/components/shared/table-list-header'

interface TableListPageProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  resource: string
  title: string
  description: string
  pathname: string
  filterCount?: number
  dateRangeCount?: number
}

export function TableListPage<TData, TValue>({
  columns,
  data,
  resource,
  title,
  description,
  pathname,
  filterCount,
  dateRangeCount,
}: TableListPageProps<TData, TValue>) {
  return (
    <>
      <Breadcrumbs pathname={pathname} />
      <div className="space-y-4">
        <TableListHeader title={title} description={description} pathname={pathname} />
        <TableListContent
          columns={columns}
          data={data}
          resource={resource}
          filterCount={filterCount}
          dateRangeCount={dateRangeCount}
        />
      </div>
    </>
  )
}
