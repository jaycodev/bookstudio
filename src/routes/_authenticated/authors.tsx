import { createFileRoute } from '@tanstack/react-router'

import AuthorsPage from '@/features/app/authors'

export const Route = createFileRoute('/_authenticated/authors')({
  component: AuthorsPage,
})
