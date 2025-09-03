import { Tags } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/categories.json'
import { CategoryList, categoryListSchema } from './schema/category.schema.ts'
import { columns } from './table/columns.tsx'

let data: CategoryList[] = []

try {
  data = categoryListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse book data. Please check the structure of your JSON file.', error)
  data = []
}

const CategoriesPage = () => {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="categories"
        title="Categorías"
        description="Organiza tus libros por temas fácilmente."
        icon={Tags}
      />
    </>
  )
}

export default CategoriesPage
