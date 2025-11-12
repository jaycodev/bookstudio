import { TableListPage } from '@dashboard/components/shared/table-list-page'

import rawData from '@/mocks/data/books.json'

import { columns } from './columns'
import { BookList, bookListSchema } from './list.schema'

let data: BookList[] = []

try {
  data = bookListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse book data. Please check the structure of your JSON file.', error)
  data = []
}

interface Props {
  title: string
}

export function BooksPage({ title }: Props) {
  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="books"
      title={title}
      description="Admínistralos sin complicaciones."
    />
  )
}
