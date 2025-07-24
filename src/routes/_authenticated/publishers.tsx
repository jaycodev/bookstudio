import { createFileRoute } from '@tanstack/react-router'

import PublishersPage from '@/pages/dashboard/Publishers/PublishersPage'

export const Route = createFileRoute('/_authenticated/publishers')({
  component: PublishersPage,
})
