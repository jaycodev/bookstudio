'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { finesApi } from '@/lib/api/fines'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function FinesPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['fines'],
    queryFn: finesApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch fines:', error)
  }

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="fines"
      title={title}
      description="Control de sanciones."
      pathname={pathname}
    />
  )
}
