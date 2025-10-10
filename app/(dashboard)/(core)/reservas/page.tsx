import type { Metadata } from 'next'

import { ReservationsPage } from '@dashboard/pages/reservations'

import { pageMap } from '@/config/page-map'

const page = pageMap['/reservas']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <ReservationsPage title={page.title} />
}
