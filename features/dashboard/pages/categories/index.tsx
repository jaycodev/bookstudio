import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { categoriesApi } from '@/lib/api/categories'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function CategoriesPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Organiza tus libros por temas fácilmente."
      pathname={pathname}
      skeletonConfig={{ columnCount: 6, filterCount: 2, dateRangeCount: 0 }}
    >
      <TableListContent
        columns={columns}
        resource="categories"
        dataFetcher={categoriesApi.getAll}
      />
    </TableListLayout>
  )
}
