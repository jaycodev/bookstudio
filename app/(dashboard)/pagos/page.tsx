import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { PaymentsPage } from '@/features/dashboard/pages/payments'

const page = pageMap['/pagos']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <PaymentsPage title={page.title} />
}
