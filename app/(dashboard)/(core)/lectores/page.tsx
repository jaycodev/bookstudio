import type { Metadata } from 'next'

import { ReadersPage } from '@dashboard/pages/readers'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/lectores'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <ReadersPage title={page.title} pathname={PATHNAME} />
}
