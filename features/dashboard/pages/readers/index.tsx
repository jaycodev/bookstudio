import { TableListPage } from '@dashboard/components/shared/table-list-page'

import rawData from '@/mocks/data/readers.json'

import { columns } from './columns'
import { ReaderList, readerListSchema } from './list.schema'

let data: ReaderList[] = []

try {
  data = readerListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse reader data. Please check the structure of your JSON file.', error)
  data = []
}

interface Props {
  title: string
}

export function ReadersPage({ title }: Props) {
  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="readers"
      title={title}
      description="Seguimiento de miembros."
    />
  )
}
