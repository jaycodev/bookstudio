import type { Metadata } from 'next'

import { CopiesPage } from '@dashboard/pages/copies'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/ejemplares'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <CopiesPage title={page.title} pathname={PATHNAME} />
}
