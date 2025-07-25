import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/students.json'
import { Student } from './schema/student.schema.ts'
import { columns } from './table/columns.tsx'

const data: Student[] = rawData.map((student) => ({
  ...student,
  Status: student.Status === 'activo' ? 'activo' : 'inactivo',
}))

const StudentsPage = () => {
  return <DataTable columns={columns} data={data} resource="students" />
}

export default StudentsPage
