'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { copiesApi } from '@/lib/api/copies'

import { columns } from './columns'

interface Props {
  title: string
}

export function CopiesPage({ title }: Props) {
  const { data, error } = useQuery({
    queryKey: ['copies'],
    queryFn: copiesApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch copies:', error)
  }

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="copies"
      title={title}
      description="Controla tu inventario fácilmente."
    />
  )
}
