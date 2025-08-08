import { DollarSign } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/payments.json'
import { PaymentList, paymentListSchema } from './schema/payment.schema.ts'
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

const PaymentsPage = () => {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="payments"
        title="Pagos"
        description="Historial de transacciones."
        icon={DollarSign}
      />
    </>
  )
}

export default PaymentsPage
