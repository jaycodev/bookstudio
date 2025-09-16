import { createFileRoute } from '@tanstack/react-router'

import { DashboardPage } from '@/features/app/main/dashboard'

export const Route = createFileRoute('/_app/')({
  component: DashboardPage,
})
