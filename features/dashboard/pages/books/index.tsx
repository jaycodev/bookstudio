import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

import rawData from './data/books.json'
import { BookList, bookListSchema } from './schema/list.schema'
import { columns } from './table/columns'

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
