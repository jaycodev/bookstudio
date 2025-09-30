import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

import rawData from './data/workers.json'
import { WorkerList, workerListSchema } from './schema/list.schema'
import { columns } from './table/columns'

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
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="workers"
        title={title}
        description="Administra tu equipo."
      />
    </>
  )
}
