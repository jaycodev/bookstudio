import { DataTable } from '@/components/data-table/data-table'
import { columns } from './courses-columns'
import rawData from './courses.json'
import { Course } from './schema'

const data: Course[] = rawData.map((course) => ({
  ...course,
  Status: course.Status === 'activo' ? 'activo' : 'inactivo',
}))

const CoursesPage = () => {
  return <DataTable columns={columns} data={data} resource="courses" />
}

export default CoursesPage
