import { TableListPage } from '@dashboard/components/shared/table-list-page'

import rawData from '@/mocks/data/categories.json'

import { columns } from './columns'
import { CategoryList, categoryListSchema } from './list.schema'

let data: CategoryList[] = []

try {
  data = categoryListSchema.array().parse(rawData)
} catch (error) {
  console.error(
    'Failed to parse category data. Please check the structure of your JSON file.',
    error
  )
  data = []
}

interface Props {
  title: string
}

export function CategoriesPage({ title }: Props) {
  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="categories"
      title={title}
      description="Organiza tus libros por temas fácilmente."
    />
  )
}
