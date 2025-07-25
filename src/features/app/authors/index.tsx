import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/authors.json'
import { Author } from './schema/author.schema.ts'
import { columns } from './table/columns.tsx'

const data: Author[] = rawData.map((author) => ({
  ...author,
  Status: author.Status === 'activo' ? 'activo' : 'inactivo',
}))

const AuthorsPage = () => {
  return <DataTable columns={columns} data={data} resource="authors" />
}

export default AuthorsPage
