import { createFileRoute } from '@tanstack/react-router'

import { ReadersPage } from '@/features/app/users/readers'

export const Route = createFileRoute('/_app/lectores/')({
  component: ReadersPage,
})
