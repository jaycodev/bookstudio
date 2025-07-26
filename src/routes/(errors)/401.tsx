import { createFileRoute } from '@tanstack/react-router'

import UnauthorisedError from '@/features/errors/pages/unauthorized'

export const Route = createFileRoute('/(errors)/401')({
  component: UnauthorisedError,
})
