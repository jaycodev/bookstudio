import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/books.json'
import { Book } from './schema/book.schema.ts'
import { columns } from './table/columns.tsx'

const data: Book[] = rawData.map((book) => ({
  ...book,
  Status: book.Status === 'activo' ? 'activo' : 'inactivo',
}))

const BooksPage = () => {
  return <DataTable columns={columns} data={data} resource="books" />
}

export default BooksPage
