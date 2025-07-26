import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/categories.json'
import { Category } from './schema/category.schema.ts'
import { columns } from './table/columns.tsx'

const data: Category[] = rawData.map((category) => ({
  ...category,
  Status: category.Status === 'activo' ? 'activo' : 'inactivo',
}))

const CategoriesPage = () => {
  return <DataTable columns={columns} data={data} resource="courses" />
}

export default CategoriesPage
