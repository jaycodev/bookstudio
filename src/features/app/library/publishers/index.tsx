import { Building2 } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/publishers.json'
import { PublisherList, publisherListSchema } from './schema/list.schema.ts'
import { columns } from './table/columns.tsx'

let data: PublisherList[] = []

try {
  data = publisherListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse copy data. Please check the structure of your JSON file.', error)
  data = []
}

const PublishersPage = () => {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="publishers"
        title="Editoriales"
        description="Información siempre lista."
        icon={Building2}
      />
    </>
  )
}

export default PublishersPage
