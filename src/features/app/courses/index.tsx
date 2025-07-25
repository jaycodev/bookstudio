import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import { columns } from './columns.tsx'
import rawData from './courses.json'
import { Course } from './schema.ts'

const data: Course[] = rawData.map((course) => ({
  ...course,
  Status: course.Status === 'activo' ? 'activo' : 'inactivo',
}))

const CoursesPage = () => {
  return <DataTable columns={columns} data={data} resource="courses" />
}

export default CoursesPage
