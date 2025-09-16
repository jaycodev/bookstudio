import { createFileRoute } from '@tanstack/react-router'

import { LoginPage } from '@/features/auth/login'

export const Route = createFileRoute('/_auth/iniciar-sesion/')({
  component: LoginPage,
})
