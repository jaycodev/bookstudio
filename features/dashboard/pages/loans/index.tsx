'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { loansApi } from '@/lib/api/loans'

import { columns } from './columns'

interface Props {
  title: string
}

export function LoansPage({ title }: Props) {
  const { data, error } = useQuery({
    queryKey: ['loans'],
    queryFn: loansApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch loans:', error)
  }

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="loans"
      title={title}
      description="Todo lo que necesitas para gestionarlos."
    />
  )
}
