import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { booksApi } from '@/lib/api/books'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function BooksPage({ title, pathname }: Props) {
  const data = await booksApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="books"
      title={title}
      description="Admínistralos sin complicaciones."
      pathname={pathname}
    />
  )
}
