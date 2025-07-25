import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/courses.json'
import { Course } from './schema/course.schema.ts'
import { columns } from './table/columns.tsx'

const data: Course[] = rawData.map((course) => ({
  ...course,
  Status: course.Status === 'activo' ? 'activo' : 'inactivo',
}))

const CoursesPage = () => {
  return <DataTable columns={columns} data={data} resource="courses" />
}

export default CoursesPage
