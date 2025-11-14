'use client'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { useListQuery } from '@/hooks/use-list-query'
import { reservationsApi } from '@/lib/api/reservations'
import type { ReservationList } from '@/lib/schemas/reservation/reservation.list.schema'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
  resource: string
}

export function ReservationsPage({ title, pathname, resource }: Props) {
  const { data, error } = useListQuery<ReservationList[]>(
    pathname,
    [resource],
    reservationsApi.getAll
  )

  if (error) {
    console.error(`Failed to fetch ${resource}:`, error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource={resource}
      title={title}
      description="Organizadas, claras y accesibles."
      pathname={pathname}
    />
  )
}
