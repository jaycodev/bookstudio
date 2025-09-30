import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { WorkersPage } from '@dashboard/pages/workers'

const page = pageMap['/trabajadores']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <WorkersPage title={page.title} />
}
