import { TableListPage } from '@dashboard/components/table-list-page'

import rawData from '@/mocks/data/copies.json'

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
    <TableListPage
      columns={columns}
      data={data}
      resource="copies"
      title={title}
      description="Controla tu inventario fácilmente."
    />
  )
}
