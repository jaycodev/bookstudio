'use client'

import { TableListLayout } from '@admin/components/shared/table-list-layout'

import { useListQuery } from '@/hooks/use-list-query'
import { publishersApi } from '@/lib/api/publishers'
import type { PublisherList } from '@/lib/schemas/publisher/publisher.list.schema'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
  resource: string
}

export function PublishersPage({ title, pathname, resource }: Props) {
  const { data, error } = useListQuery<PublisherList[]>(pathname, [resource], publishersApi.getAll)

  if (error) {
    console.error(`Failed to fetch ${resource}:`, error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource={resource}
      title={title}
      description="Información siempre lista."
      pathname={pathname}
    />
  )
}
