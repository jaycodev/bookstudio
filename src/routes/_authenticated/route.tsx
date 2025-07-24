import { createFileRoute, Outlet } from '@tanstack/react-router'

import DashboardLayout from '@/layouts/DashboardLayout'

export const Route = createFileRoute('/_authenticated')({
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
})
