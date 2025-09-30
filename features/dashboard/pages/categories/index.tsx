import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

import rawData from './data/categories.json'
import { CategoryList, categoryListSchema } from './schema/list.schema'
import { columns } from './table/columns'

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
