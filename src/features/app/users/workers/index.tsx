import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/workers.json'
import { Worker } from './schema/list.schema.ts'
import { columns } from './table/columns.tsx'

const data: Worker[] = rawData.map((worker) => ({
  ...worker,
  Role: worker.Role === 'administrador' ? 'administrador' : 'bibliotecario',
}))

const WorkersPage = () => {
  return <DataTable columns={columns} data={data} resource="users" />
}

export default WorkersPage
