import { createFileRoute } from '@tanstack/react-router'

import { NotFoundError } from '@/features/errors/pages/not-found'

export const Route = createFileRoute('/(errors)/404')({
  component: NotFoundError,
})
