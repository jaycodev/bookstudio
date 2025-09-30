import rawData from '@mocks/data/categories.json'
import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

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
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="categories"
        title={title}
        description="Organiza tus libros por temas fácilmente."
      />
    </>
  )
}
