import { createFileRoute } from '@tanstack/react-router'

import BooksPage from '@/pages/dashboard/Books/BooksPage'

export const Route = createFileRoute('/_authenticated/books')({
  component: BooksPage,
})
