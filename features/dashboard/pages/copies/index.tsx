import { Breadcrumbs } from '@/features/dashboard/components/breadcrumbs'
import { DataTable } from '@/features/dashboard/components/data-table/data-table'

import rawData from './data/copies.json'
import { CopyList, copyListSchema } from './schema/list.schema'
import { columns } from './table/columns'

let data: CopyList[] = []

try {
  data = copyListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse copy data. Please check the structure of your JSON file.', error)
  data = []
}

interface Props {
  title: string
}

export function CopiesPage({ title }: Props) {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="copies"
        title={title}
        description="Controla tu inventario fácilmente."
      />
    </>
  )
}
