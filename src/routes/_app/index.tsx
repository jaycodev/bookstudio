import { createFileRoute } from '@tanstack/react-router'

import Dashboard from '@/features/app/dashboard'

export const Route = createFileRoute('/_app/')({
  component: Dashboard,
})
