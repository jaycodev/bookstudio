'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { reservationsApi } from '@/lib/api/reservations'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function ReservationsPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['reservations'],
    queryFn: reservationsApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch reservations:', error)
  }

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="reservations"
      title={title}
      description="Organizadas, claras y accesibles."
      pathname={pathname}
    />
  )
}
