import { createFileRoute } from '@tanstack/react-router'

import ForbiddenError from '@/features/errors/pages/forbidden'

export const Route = createFileRoute('/(errors)/403')({
  component: ForbiddenError,
})
