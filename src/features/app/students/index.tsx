import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import { columns } from './columns.tsx'
import { Student } from './schema.ts'
import rawData from './students.json'

const data: Student[] = rawData.map((student) => ({
  ...student,
  Status: student.Status === 'activo' ? 'activo' : 'inactivo',
}))

const StudentsPage = () => {
  return <DataTable columns={columns} data={data} resource="students" />
}

export default StudentsPage
