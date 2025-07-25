import { createFileRoute } from '@tanstack/react-router'

import CoursesPage from '@/features/app/courses'

export const Route = createFileRoute('/_app/courses/')({
  component: CoursesPage,
})
