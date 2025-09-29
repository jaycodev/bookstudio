import { Breadcrumbs } from '@/features/dashboard/components/breadcrumbs'
import { DataTable } from '@/features/dashboard/components/data-table/data-table'

import rawData from './data/fines.json'
import { FineList, fineListSchema } from './schema/list.schema'
import { columns } from './table/columns'

let data: FineList[] = []

try {
  data = fineListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse fine data. Please check the structure of your JSON file.', error)
  data = []
}

interface Props {
  title: string
}

export function FinesPage({ title }: Props) {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="fines"
        title={title}
        description="Control de sanciones."
      />
    </>
  )
}
