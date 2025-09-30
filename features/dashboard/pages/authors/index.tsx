import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

import rawData from './data/authors.json'
import { AuthorList, authorListSchema } from './schema/list.schema'
import { columns } from './table/columns'

let data: AuthorList[] = []

try {
  data = authorListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse author data. Please check the structure of your JSON file.', error)
  data = []
}

interface Props {
  title: string
}

export function AuthorsPage({ title }: Props) {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="authors"
        title={title}
        description="Rápidos, claros y ordenados."
      />
    </>
  )
}
