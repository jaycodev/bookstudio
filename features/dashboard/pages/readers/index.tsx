'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { readersApi } from '@/lib/api/readers'

import { columns } from './columns'

interface Props {
  title: string
}

export function ReadersPage({ title }: Props) {
  const { data, error } = useQuery({
    queryKey: ['readers'],
    queryFn: readersApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch readers:', error)
  }

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="readers"
      title={title}
      description="Seguimiento de miembros."
    />
  )
}
