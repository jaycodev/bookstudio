import { createFileRoute } from '@tanstack/react-router'

import UsersPage from '@/pages/dashboard/Users/UsersPage'

export const Route = createFileRoute()({
  component: UsersPage,
})
