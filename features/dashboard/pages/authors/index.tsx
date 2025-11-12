import { TableListPage } from '@dashboard/components/table-list-page'

import rawData from '@/mocks/data/authors.json'

import { columns } from './columns'
import { AuthorList, authorListSchema } from './list.schema'

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
    <TableListPage
      columns={columns}
      data={data}
      resource="authors"
      title={title}
      description="Rápidos, claros y ordenados."
    />
  )
}
