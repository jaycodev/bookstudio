import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { categoriesApi } from '@/lib/api/categories'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function CategoriesPage({ title, pathname }: Props) {
  const data = await categoriesApi.getAll()

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
