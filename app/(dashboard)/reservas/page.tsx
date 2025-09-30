import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { ReservationsPage } from '@dashboard/pages/reservations'

const page = pageMap['/reservas']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <ReservationsPage title={page.title} />
}
