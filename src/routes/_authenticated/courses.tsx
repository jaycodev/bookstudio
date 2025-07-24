import { createFileRoute } from '@tanstack/react-router'

import CoursesPage from '@/pages/dashboard/Courses/CoursesPage'

export const Route = createFileRoute('/_authenticated/courses')({
  component: CoursesPage,
})
