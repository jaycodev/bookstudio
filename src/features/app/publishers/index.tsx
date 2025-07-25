import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import { columns } from './columns.tsx'
import rawData from './publishers.json'
import { Publisher } from './schema.ts'

const data: Publisher[] = rawData.map((publisher) => ({
  ...publisher,
  Status: publisher.Status === 'activo' ? 'activo' : 'inactivo',
}))

const PublishersPage = () => {
  return <DataTable columns={columns} data={data} resource="publishers" />
}

export default PublishersPage
