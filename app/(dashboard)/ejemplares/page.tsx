import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { CopiesPage } from '@/features/dashboard/pages/copies'

const page = pageMap['/ejemplares']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <CopiesPage title={page.title} />
}
