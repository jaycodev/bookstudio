import { Suspense } from 'react'

import { DataTableSkeleton } from '@dashboard/components/data-table/data-table-skeleton'
import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { finesApi } from '@/lib/api/fines'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function FinesPage({ title, pathname }: Props) {
  return (
    <TableListPage title={title} description="Control de sanciones." pathname={pathname}>
      <Suspense fallback={<DataTableSkeleton columnCount={9} filterCount={3} dateRangeCount={1} />}>
        <TableListContent columns={columns} resource="fines" dataFetcher={finesApi.getAll} />
      </Suspense>
    </TableListPage>
  )
}
