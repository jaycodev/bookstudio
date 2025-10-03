import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { ReadersPage } from '@dashboard/pages/readers'

const page = pageMap['/lectores']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <ReadersPage title={page.title} />
}
