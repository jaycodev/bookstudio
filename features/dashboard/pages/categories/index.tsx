'use client'

import { useQuery } from '@tanstack/react-query'

import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { categoriesApi } from '@/lib/api/categories'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export function CategoriesPage({ title, pathname }: Props) {
  const { data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
    staleTime: 5 * 60 * 1000,
  })

  if (error) {
    console.error('Failed to fetch categories:', error)
  }

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="categories"
      title={title}
      description="Organiza tus libros por temas fácilmente."
      pathname={pathname}
    />
  )
}
