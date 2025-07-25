import { createFileRoute } from '@tanstack/react-router'

import ForgotPasswordPage from '@/features/auth/forgot-password'

export const Route = createFileRoute('/_auth/recuperar-contraseña/')({
  component: ForgotPasswordPage,
})
