import { TableListPage } from '@dashboard/components/shared/table-list-page'

import rawData from '@/mocks/data/payments.json'

import { columns } from './columns'
import { PaymentList, paymentListSchema } from './list.schema'

let data: PaymentList[] = []

try {
  data = paymentListSchema.array().parse(rawData)
} catch (error) {
  console.error(
    'Failed to parse payment data. Please check the structure of your JSON file.',
    error
  )
  data = []
}

interface Props {
  title: string
}

export function PaymentsPage({ title }: Props) {
  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="payments"
      title={title}
      description="Historial de transacciones."
    />
  )
}
