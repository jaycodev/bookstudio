import { createFileRoute } from '@tanstack/react-router'

import Dashboard from '@/pages/dashboard/Dashboard/Dashboard'

export const Route = createFileRoute('/_authenticated/')({
  component: Dashboard,
})
