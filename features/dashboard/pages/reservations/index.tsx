import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { reservationsApi } from '@/lib/api/reservations'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function ReservationsPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Organizadas, claras y accesibles."
      pathname={pathname}
      skeletonConfig={{ columnCount: 8, filterCount: 2, dateRangeCount: 1 }}
    >
      <TableListContent
        columns={columns}
        resource="reservations"
        dataFetcher={reservationsApi.getAll}
      />
    </TableListLayout>
  )
}
