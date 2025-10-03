import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { FinesPage } from '@dashboard/pages/fines'

const page = pageMap['/multas']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <FinesPage title={page.title} />
}
