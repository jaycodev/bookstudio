import { createFileRoute } from '@tanstack/react-router'

import ResetPasswordPage from '@/features/auth/reset-password'

export const Route = createFileRoute('/_auth/reset-password/')({
  component: ResetPasswordPage,
})
