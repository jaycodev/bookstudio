import type { Metadata } from 'next'

import { WorkersPage } from '@dashboard/pages/workers'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/trabajadores'
const page = pageMap[PATHNAME]

const title = page.title
const resource = page.resource!

export const metadata: Metadata = {
  title,
}

export default function Page() {
  return <WorkersPage title={title} pathname={PATHNAME} resource={resource} />
}
