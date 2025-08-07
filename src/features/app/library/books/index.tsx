import { BookCopy } from 'lucide-react'

import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/books.json'
import { BookList, bookListSchema } from './schema/book.schema.ts'
import { columns } from './table/columns'

let data: BookList[] = []

try {
  data = bookListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse book data. Please check the structure of your JSON file.', error)
  data = []
}

const BooksPage = () => {
  return (
    <DataTable
      columns={columns}
      data={data}
      resource="books"
      title="Libros"
      description="Admínistralos sin complicaciones."
      icon={BookCopy}
    />
  )
}

export default BooksPage
