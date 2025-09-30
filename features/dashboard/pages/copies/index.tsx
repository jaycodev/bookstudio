import rawData from '@mocks/data/copies.json'
import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

import { columns } from './columns'
import { CopyList, copyListSchema } from './list.schema'

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
