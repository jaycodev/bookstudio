'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { workersApi } from '@/lib/api/workers'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function WorkersPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['workers'],
    queryFn: workersApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch workers:', error)
  }

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="workers"
      title={title}
      description="Administra tu equipo."
      pathname={pathname}
    />
  )
}
