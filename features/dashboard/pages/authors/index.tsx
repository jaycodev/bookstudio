'use client'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { useListQuery } from '@/hooks/use-list-query'
import { authorsApi } from '@/lib/api/authors'
import type { AuthorList } from '@/lib/schemas/author/author.list.schema'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
  resource: string
}

export function AuthorsPage({ title, pathname, resource }: Props) {
  const { data, error } = useListQuery<AuthorList[]>(pathname, [resource], authorsApi.getAll)

  if (error) {
    console.error(`Failed to fetch ${resource}:`, error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource={resource}
      title={title}
      description="Rápidos, claros y ordenados."
      pathname={pathname}
    />
  )
}
