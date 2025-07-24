import { createFileRoute } from '@tanstack/react-router'

import AuthorsPage from '@/pages/dashboard/Authors/AuthorsPage'

export const Route = createFileRoute('/_authenticated/authors')({
  component: AuthorsPage,
})
