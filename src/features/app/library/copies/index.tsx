import { Boxes } from 'lucide-react'

import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/copies.json'
import { CopyList, copyListSchema } from './schema/copy.schema.ts'
import { columns } from './table/columns'

let data: CopyList[] = []

try {
  data = copyListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse copy data. Please check the structure of your JSON file.', error)
  data = []
}

const CopiesPage = () => {
  return (
    <DataTable
      columns={columns}
      data={data}
      resource="copies"
      title="Ejemplares"
      description="Controla tu inventario fácilmente."
      icon={Boxes}
    />
  )
}

export default CopiesPage
