// src/routes/(auth)/layout.ts
import { createRoute, Outlet } from '@tanstack/react-router'

import AuthLayout from '@/layouts/AuthLayout'
import { rootRoute } from '@/routes/__root'

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '',
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
})
