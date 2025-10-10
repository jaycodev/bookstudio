import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

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
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="books"
        title={title}
        description="Admínistralos sin complicaciones."
      />
    </>
  )
}
