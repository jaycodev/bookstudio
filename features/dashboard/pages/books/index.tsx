'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { booksApi } from '@/lib/api/books'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function BooksPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['books'],
    queryFn: booksApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch books:', error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource="books"
      title={title}
      description="Admínistralos sin complicaciones."
      pathname={pathname}
    />
  )
}
