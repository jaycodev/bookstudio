import { DataTable } from '@/components/data-table/data-table'

import { Student } from './schema'
import { columns } from './students.columns'
import rawData from './students.json'

const data: Student[] = rawData.map((student) => ({
  ...student,
  Status: student.Status === 'activo' ? 'activo' : 'inactivo',
}))

const StudentsPage = () => {
  return <DataTable columns={columns} data={data} resource="students" />
}

export default StudentsPage
