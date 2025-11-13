import { Suspense } from 'react'

import { DataTableSkeleton } from '@dashboard/components/data-table/data-table-skeleton'
import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { workersApi } from '@/lib/api/workers'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function WorkersPage({ title, pathname }: Props) {
  return (
    <TableListPage title={title} description="Administra tu equipo." pathname={pathname}>
      <Suspense fallback={<DataTableSkeleton columnCount={7} filterCount={2} dateRangeCount={0} />}>
        <TableListContent columns={columns} resource="workers" dataFetcher={workersApi.getAll} />
      </Suspense>
    </TableListPage>
  )
}
