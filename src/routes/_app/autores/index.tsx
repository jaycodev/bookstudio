import { createFileRoute } from '@tanstack/react-router'

import { AuthorsPage } from '@/features/app/library/authors'

export const Route = createFileRoute('/_app/autores/')({
  component: AuthorsPage,
})
