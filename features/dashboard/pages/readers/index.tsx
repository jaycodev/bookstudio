import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

import rawData from './data/readers.json'
import { ReaderList, readerListSchema } from './schema/list.schema'
import { columns } from './table/columns'

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
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="readers"
        title={title}
        description="Seguimiento de miembros."
      />
    </>
  )
}
