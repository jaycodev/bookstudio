import { BookOpenText } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/readers.json'
import { ReaderList, readerListSchema } from './schema/list.schema.ts'
import { columns } from './table/columns'

let data: ReaderList[] = []

try {
  data = readerListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse reader data. Please check the structure of your JSON file.', error)
  data = []
}

export function ReadersPage() {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="readers"
        title="Lectores"
        description="Seguimiento de miembros."
        icon={BookOpenText}
      />
    </>
  )
}
