import type { Metadata } from 'next'

import { LoansPage } from '@dashboard/pages/loans'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/prestamos'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <LoansPage title={page.title} pathname={PATHNAME} />
}
