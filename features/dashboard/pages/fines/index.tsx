import { TableListPage } from '@dashboard/components/shared/table-list-page'

import rawData from '@/mocks/data/fines.json'

import { columns } from './columns'
import { FineList, fineListSchema } from './list.schema'

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
    <TableListPage
      columns={columns}
      data={data}
      resource="fines"
      title={title}
      description="Control de sanciones."
    />
  )
}
