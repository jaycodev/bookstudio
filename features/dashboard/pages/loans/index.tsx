'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { loansApi } from '@/lib/api/loans'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function LoansPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['loans'],
    queryFn: loansApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch loans:', error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource="loans"
      title={title}
      description="Todo lo que necesitas para gestionarlos."
      pathname={pathname}
    />
  )
}
