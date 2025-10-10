import type { Metadata } from 'next'

import { CopiesPage } from '@dashboard/pages/copies'

import { pageMap } from '@/config/page-map'

const page = pageMap['/ejemplares']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <CopiesPage title={page.title} />
}
