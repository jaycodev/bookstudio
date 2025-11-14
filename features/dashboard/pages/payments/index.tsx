import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { paymentsApi } from '@/lib/api/payments'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function PaymentsPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Historial de transacciones."
      pathname={pathname}
      skeletonConfig={{ columnCount: 9, filterCount: 2, dateRangeCount: 1 }}
    >
      <TableListContent columns={columns} resource="payments" dataFetcher={paymentsApi.getAll} />
    </TableListLayout>
  )
}
