'use client'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { useListQuery } from '@/hooks/use-list-query'
import { booksApi } from '@/lib/api/books'
import type { BookList } from '@/lib/schemas/book/book.list.schema'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
  resource: string
}

export function BooksPage({ title, pathname, resource }: Props) {
  const { data, error } = useListQuery<BookList[]>(pathname, [resource], booksApi.getAll)

  if (error) {
    console.error(`Failed to fetch ${resource}:`, error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource={resource}
      title={title}
      description="Admínistralos sin complicaciones."
      pathname={pathname}
    />
  )
}
