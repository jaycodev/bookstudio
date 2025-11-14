'use client'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { useListQuery } from '@/hooks/use-list-query'
import { copiesApi } from '@/lib/api/copies'
import type { CopyList } from '@/lib/schemas/copy/copy.list.schema'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
  resource: string
}

export function CopiesPage({ title, pathname, resource }: Props) {
  const { data, error } = useListQuery<CopyList[]>(pathname, [resource], copiesApi.getAll)

  if (error) {
    console.error(`Failed to fetch ${resource}:`, error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource={resource}
      title={title}
      description="Controla tu inventario fácilmente."
      pathname={pathname}
    />
  )
}
