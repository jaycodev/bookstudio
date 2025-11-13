'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { authorsApi } from '@/lib/api/authors'

import { columns } from './columns'

interface Props {
  title: string
}

export function AuthorsPage({ title }: Props) {
  const { data, error } = useQuery({
    queryKey: ['authors'],
    queryFn: authorsApi.getAll,
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
  })

  if (error) {
    console.error('Failed to fetch authors:', error)
  }

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="authors"
      title={title}
      description="Rápidos, claros y ordenados."
    />
  )
}
