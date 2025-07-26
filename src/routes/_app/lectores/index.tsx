import { createFileRoute } from '@tanstack/react-router'

import StudentsPage from '@/features/app/students'

export const Route = createFileRoute('/_app/lectores/')({
  component: StudentsPage,
})
