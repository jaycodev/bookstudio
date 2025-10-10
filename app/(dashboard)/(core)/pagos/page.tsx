import type { Metadata } from 'next'

import { PaymentsPage } from '@dashboard/pages/payments'

import { pageMap } from '@/config/page-map'

const page = pageMap['/pagos']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <PaymentsPage title={page.title} />
}
