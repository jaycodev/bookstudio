'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { publishersApi } from '@/lib/api/publishers'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function PublishersPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['publishers'],
    queryFn: publishersApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch publishers:', error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource="publishers"
      title={title}
      description="Información siempre lista."
      pathname={pathname}
    />
  )
}
