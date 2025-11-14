import type { Metadata } from 'next'

import { PaymentsPage } from '@admin/pages/payments'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/pagos'
const page = pageMap[PATHNAME]

const title = page.title
const resource = page.resource!

export const metadata: Metadata = {
  title,
}

export default function Page() {
  return <PaymentsPage title={title} pathname={PATHNAME} resource={resource} />
}
