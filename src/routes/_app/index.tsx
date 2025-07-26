import { createFileRoute } from '@tanstack/react-router'

import Dashboard from '@/features/app/main/dashboard'

export const Route = createFileRoute('/_app/')({
  component: Dashboard,
})
