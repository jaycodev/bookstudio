import { Users } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/authors.json'
import { AuthorList, authorListSchema } from './schema/author.schema.ts'
import { columns } from './table/columns'

let data: AuthorList[] = []

try {
  data = authorListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse author data. Please check the structure of your JSON file.', error)
  data = []
}

const AuthorsPage = () => {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="authors"
        title="Autores"
        description="Rápidos, claros y ordenados."
        icon={Users}
      />
    </>
  )
}

export default AuthorsPage
