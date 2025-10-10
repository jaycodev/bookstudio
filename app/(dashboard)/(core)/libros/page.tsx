import type { Metadata } from 'next'

import { BooksPage } from '@dashboard/pages/books'

import { pageMap } from '@/config/page-map'

const page = pageMap['/libros']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <BooksPage title={page.title} />
}
