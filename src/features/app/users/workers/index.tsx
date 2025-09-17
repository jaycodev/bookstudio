import { Briefcase } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/workers.json'
import { WorkerList, workerListSchema } from './schema/list.schema.ts'
import { columns } from './table/columns'

let data: WorkerList[] = []

try {
  data = workerListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse worker data. Please check the structure of your JSON file.', error)
  data = []
}

export function WorkersPage() {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="workers"
        title="Trabajadores"
        description="Control de personal."
        icon={Briefcase}
      />
    </>
  )
}
