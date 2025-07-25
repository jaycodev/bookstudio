import { createFileRoute } from '@tanstack/react-router'

import BooksPage from '@/features/app/books'

export const Route = createFileRoute('/_authenticated/books')({
  component: BooksPage,
})
