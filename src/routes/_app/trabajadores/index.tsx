import { createFileRoute } from '@tanstack/react-router'

import { WorkersPage } from '@/features/app/users/workers'

export const Route = createFileRoute('/_app/trabajadores/')({
  component: WorkersPage,
})
