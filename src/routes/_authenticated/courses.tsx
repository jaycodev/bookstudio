import { createFileRoute } from '@tanstack/react-router'

import CoursesPage from '@/features/app/courses'

export const Route = createFileRoute('/_authenticated/courses')({
  component: CoursesPage,
})
