import type { Metadata } from 'next'

import { WorkersPage } from '@dashboard/pages/workers'

import { pageMap } from '@/config/page-map'

const page = pageMap['/trabajadores']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <WorkersPage title={page.title} />
}
