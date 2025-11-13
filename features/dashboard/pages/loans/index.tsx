import { Suspense } from 'react'

import { DataTableSkeleton } from '@dashboard/components/data-table/data-table-skeleton'
import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { loansApi } from '@/lib/api/loans'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function LoansPage({ title, pathname }: Props) {
  return (
    <TableListPage
      title={title}
      description="Todo lo que necesitas para gestionarlos."
      pathname={pathname}
    >
      <Suspense fallback={<DataTableSkeleton columnCount={6} filterCount={2} dateRangeCount={1} />}>
        <TableListContent columns={columns} resource="loans" dataFetcher={loansApi.getAll} />
      </Suspense>
    </TableListPage>
  )
}
