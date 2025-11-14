import type { Metadata } from 'next'

import { BooksPage } from '@dashboard/pages/books'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/libros'
const RESOURCE = 'books'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <BooksPage title={page.title} pathname={PATHNAME} resource={RESOURCE} />
}
