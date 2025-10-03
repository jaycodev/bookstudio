import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { BooksPage } from '@dashboard/pages/books'

const page = pageMap['/libros']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <BooksPage title={page.title} />
}
