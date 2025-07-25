import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './books.json'
import { columns } from './columns.tsx'
import { Book } from './schema.ts'

const data: Book[] = rawData.map((book) => ({
  ...book,
  Status: book.Status === 'activo' ? 'activo' : 'inactivo',
}))

const BooksPage = () => {
  return <DataTable columns={columns} data={data} resource="books" />
}

export default BooksPage
