import { DataTable } from '@/components/data-table/data-table'
import { columns } from './publishers-columns'
import rawData from './publishers.json'
import { Publisher } from './schema'

const data: Publisher[] = rawData.map((publisher) => ({
  ...publisher,
  Status: publisher.Status === 'activo' ? 'activo' : 'inactivo',
}))

const PublishersPage = () => {
  return <DataTable columns={columns} data={data} resource="publishers" />
}

export default PublishersPage
