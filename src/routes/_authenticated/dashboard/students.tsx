import { createFileRoute } from '@tanstack/react-router'

import StudentsPage from '@/pages/dashboard/Students/StudentsPage'

export const Route = createFileRoute()({
  component: StudentsPage,
})
