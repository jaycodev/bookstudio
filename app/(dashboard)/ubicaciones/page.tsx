import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { LocationsPage } from '@dashboard/pages/locations'

const page = pageMap['/ubicaciones']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <LocationsPage title={page.title} />
}
