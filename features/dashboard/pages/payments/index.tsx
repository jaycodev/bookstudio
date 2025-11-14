'use client'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { useListQuery } from '@/hooks/use-list-query'
import { paymentsApi } from '@/lib/api/payments'
import type { PaymentList } from '@/lib/schemas/payment/payment.list.schema'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
  resource: string
}

export function PaymentsPage({ title, pathname, resource }: Props) {
  const { data, error } = useListQuery<PaymentList[]>(pathname, [resource], paymentsApi.getAll)

  if (error) {
    console.error(`Failed to fetch ${resource}:`, error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource={resource}
      title={title}
      description="Historial de transacciones."
      pathname={pathname}
    />
  )
}
