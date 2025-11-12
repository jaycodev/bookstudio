import { TableListPage } from '@dashboard/components/table-list-page'

import rawData from '@/mocks/data/publishers.json'

import { columns } from './columns'
import { PublisherList, publisherListSchema } from './list.schema'

let data: PublisherList[] = []

try {
  data = publisherListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse copy data. Please check the structure of your JSON file.', error)
  data = []
}

interface Props {
  title: string
}

export function PublishersPage({ title }: Props) {
  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="publishers"
      title={title}
      description="Información siempre lista."
    />
  )
}
