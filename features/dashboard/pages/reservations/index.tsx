import { Suspense } from 'react'

import { DataTableSkeleton } from '@dashboard/components/data-table/data-table-skeleton'
import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { reservationsApi } from '@/lib/api/reservations'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function ReservationsPage({ title, pathname }: Props) {
  return (
    <TableListPage
      title={title}
      description="Organizadas, claras y accesibles."
      pathname={pathname}
    >
      <Suspense fallback={<DataTableSkeleton columnCount={6} filterCount={2} dateRangeCount={1} />}>
        <TableListContent
          columns={columns}
          resource="reservations"
          dataFetcher={reservationsApi.getAll}
        />
      </Suspense>
    </TableListPage>
  )
}
