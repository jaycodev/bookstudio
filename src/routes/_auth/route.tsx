import { createFileRoute } from '@tanstack/react-router'

import AuthLayout from '@/features/auth/auth-layout'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})
