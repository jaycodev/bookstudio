'use client'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { useListQuery } from '@/hooks/use-list-query'
import { finesApi } from '@/lib/api/fines'
import type { FineList } from '@/lib/schemas/fine/fine.list.schema'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
  resource: string
}

export function FinesPage({ title, pathname, resource }: Props) {
  const { data, error } = useListQuery<FineList[]>(pathname, [resource], finesApi.getAll)

  if (error) {
    console.error(`Failed to fetch ${resource}:`, error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource={resource}
      title={title}
      description="Control de sanciones."
      pathname={pathname}
    />
  )
}
