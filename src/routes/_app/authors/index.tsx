import { createFileRoute } from '@tanstack/react-router'

import AuthorsPage from '@/features/app/authors'

export const Route = createFileRoute('/_app/authors/')({
  component: AuthorsPage,
})
