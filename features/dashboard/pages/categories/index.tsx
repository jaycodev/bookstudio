import { Suspense } from 'react'

import { DataTableSkeleton } from '@dashboard/components/data-table/data-table-skeleton'
import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { categoriesApi } from '@/lib/api/categories'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function CategoriesPage({ title, pathname }: Props) {
  return (
    <TableListPage
      title={title}
      description="Organiza tus libros por temas fácilmente."
      pathname={pathname}
    >
      <Suspense fallback={<DataTableSkeleton columnCount={6} filterCount={2} dateRangeCount={1} />}>
        <TableListContent
          columns={columns}
          resource="categories"
          dataFetcher={categoriesApi.getAll}
        />
      </Suspense>
    </TableListPage>
  )
}
