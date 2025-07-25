import { createFileRoute } from '@tanstack/react-router'

import PublishersPage from '@/features/app/publishers'

export const Route = createFileRoute('/_authenticated/publishers')({
  component: PublishersPage,
})
