import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { booksApi } from '@/lib/api/books'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function BooksPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Admínistralos sin complicaciones."
      pathname={pathname}
      skeletonConfig={{ columnCount: 9, filterCount: 6, dateRangeCount: 0 }}
    >
      <TableListContent columns={columns} resource="books" dataFetcher={booksApi.getAll} />
    </TableListLayout>
  )
}
