import type { Metadata } from 'next'

import { ReservationsPage } from '@dashboard/pages/reservations'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/reservas'
const RESOURCE = 'reservations'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <ReservationsPage title={page.title} pathname={PATHNAME} resource={RESOURCE} />
}
