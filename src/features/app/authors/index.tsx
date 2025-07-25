import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './authors.json'
import { columns } from './authors-columns'
import { Author } from './schema.ts'

const data: Author[] = rawData.map((author) => ({
  ...author,
  Status: author.Status === 'activo' ? 'activo' : 'inactivo',
}))

const AuthorsPage = () => {
  return <DataTable columns={columns} data={data} resource="authors" />
}

export default AuthorsPage
