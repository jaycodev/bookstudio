'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { rolesApi } from '@/lib/api/roles'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function RolesPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['roles'],
    queryFn: rolesApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch roles:', error)
  }

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="roles"
      title={title}
      description="Define permisos fácilmente."
      pathname={pathname}
    />
  )
}
