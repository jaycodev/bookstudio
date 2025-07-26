import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/publishers.json'
import { Publisher } from './schema/publisher.schema.ts'
import { columns } from './table/columns.tsx'

const data: Publisher[] = rawData.map((publisher) => ({
  ...publisher,
  Status: publisher.Status === 'activo' ? 'activo' : 'inactivo',
}))

const PublishersPage = () => {
  return <DataTable columns={columns} data={data} resource="publishers" />
}

export default PublishersPage
