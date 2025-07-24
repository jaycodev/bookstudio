import { createFileRoute, Outlet } from '@tanstack/react-router'

import AuthLayout from '@/layouts/AuthLayout'

export const Route = createFileRoute('/(auth)')({
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
})
