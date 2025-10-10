import type { Metadata } from 'next'

import { FinesPage } from '@dashboard/pages/fines'

import { pageMap } from '@/config/page-map'

const page = pageMap['/multas']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <FinesPage title={page.title} />
}
