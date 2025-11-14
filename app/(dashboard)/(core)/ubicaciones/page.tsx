import type { Metadata } from 'next'

import { LocationsPage } from '@dashboard/pages/locations'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/ubicaciones'
const RESOURCE = 'locations'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <LocationsPage title={page.title} pathname={PATHNAME} resource={RESOURCE} />
}
