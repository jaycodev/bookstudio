'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { paymentsApi } from '@/lib/api/payments'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function PaymentsPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['payments'],
    queryFn: paymentsApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch payments:', error)
  }

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
