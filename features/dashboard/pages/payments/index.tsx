import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { paymentsApi } from '@/lib/api/payments'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function PaymentsPage({ title, pathname }: Props) {
  const data = await paymentsApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="payments"
      title={title}
      description="Historial de transacciones."
      pathname={pathname}
    />
  )
}
