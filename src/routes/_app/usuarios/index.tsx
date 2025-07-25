import { createFileRoute } from '@tanstack/react-router'

import UsersPage from '@/features/app/users'

export const Route = createFileRoute('/_app/usuarios/')({
  component: UsersPage,
})
