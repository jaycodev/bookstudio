import { Suspense } from 'react'

import { DataTableSkeleton } from '@dashboard/components/data-table/data-table-skeleton'
import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { booksApi } from '@/lib/api/books'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function BooksPage({ title, pathname }: Props) {
  return (
    <TableListPage
      title={title}
      description="Admínistralos sin complicaciones."
      pathname={pathname}
    >
      <Suspense fallback={<DataTableSkeleton columnCount={6} filterCount={2} dateRangeCount={1} />}>
        <TableListContent columns={columns} resource="books" dataFetcher={booksApi.getAll} />
      </Suspense>
    </TableListPage>
  )
}
