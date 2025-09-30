import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { LoansPage } from '@dashboard/pages/loans'

const page = pageMap['/prestamos']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <LoansPage title={page.title} />
}
