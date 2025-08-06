import { OctagonAlert } from 'lucide-react'

import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/fines.json'
import { FineList, fineListSchema } from './schema/fine.schema.ts'
import { columns } from './table/columns'

let data: FineList[] = []

try {
  data = fineListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse fine data. Please check the structure of your JSON file.', error)
  data = []
}

const FinesPage = () => {
  return (
    <DataTable
      columns={columns}
      data={data}
      resource="fines"
      title="Multas"
      description="Control de sanciones."
      icon={OctagonAlert}
    />
  )
}

export default FinesPage
