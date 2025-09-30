import rawData from '@mocks/data/publishers.json'
import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

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
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="publishers"
        title={title}
        description="Información siempre lista."
      />
    </>
  )
}
