import { createFileRoute } from '@tanstack/react-router'

import BooksPage from '@/features/app/library/books'

export const Route = createFileRoute('/_app/libros/')({
  component: BooksPage,
})
