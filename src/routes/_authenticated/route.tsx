import { createFileRoute, Outlet } from '@tanstack/react-router'

import AppLayout from '@/features/app/app-layout'

export const Route = createFileRoute('/_authenticated')({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
})
