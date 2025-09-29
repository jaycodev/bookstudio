import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { AuthorsPage } from '@/features/dashboard/pages/authors'

const page = pageMap['/autores']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <AuthorsPage title={page.title} />
}
