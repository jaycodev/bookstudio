import type { Metadata } from 'next'

import { LocationsPage } from '@dashboard/pages/locations'

import { pageMap } from '@/config/page-map'

const page = pageMap['/ubicaciones']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <LocationsPage title={page.title} />
}
