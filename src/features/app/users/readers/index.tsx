import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/readers.json'
import { Reader } from './schema/list.schema.ts'
import { columns } from './table/columns.tsx'

const data: Reader[] = rawData.map((reader) => ({
  ...reader,
  Status: reader.Status === 'activo' ? 'activo' : 'inactivo',
}))

export function ReadersPage() {
  return <DataTable columns={columns} data={data} resource="students" />
}
