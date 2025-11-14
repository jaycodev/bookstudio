import type { Metadata } from 'next'

import { WorkersPage } from '@dashboard/pages/workers'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/trabajadores'
const RESOURCE = 'workers'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <WorkersPage title={page.title} pathname={PATHNAME} resource={RESOURCE} />
}
