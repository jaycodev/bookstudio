import { Breadcrumbs } from '@/features/dashboard/components/breadcrumbs'
import { DataTable } from '@/features/dashboard/components/data-table/data-table'

import rawData from './data/payments.json'
import { PaymentList, paymentListSchema } from './schema/list.schema'
import { columns } from './table/columns'

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
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="payments"
        title={title}
        description="Historial de transacciones."
      />
    </>
  )
}
