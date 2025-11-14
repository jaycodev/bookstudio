'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { locationsApi } from '@/lib/api/locations'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function LocationsPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['locations'],
    queryFn: locationsApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch locations:', error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource="locations"
      title={title}
      description="Gestiona los espacios de tu biblioteca."
      pathname={pathname}
    />
  )
}
