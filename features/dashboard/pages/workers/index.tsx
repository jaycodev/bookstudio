import { TableListPage } from '@dashboard/components/shared/table-list-page'

import rawData from '@/mocks/data/workers.json'

import { columns } from './columns'
import { WorkerList, workerListSchema } from './list.schema'

let data: WorkerList[] = []

try {
  data = workerListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse worker data. Please check the structure of your JSON file.', error)
  data = []
}

interface Props {
  title: string
}

export function WorkersPage({ title }: Props) {
  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="workers"
      title={title}
      description="Administra tu equipo."
    />
  )
}
