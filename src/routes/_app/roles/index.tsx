import { createFileRoute } from '@tanstack/react-router'

import { RolesPage } from '@/features/app/users/roles'

export const Route = createFileRoute('/_app/roles/')({
  component: RolesPage,
})
