import type { Metadata } from 'next'

import { RolesPage } from '@dashboard/pages/roles'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/roles'
const page = pageMap[PATHNAME]

const title = page.title
const resource = page.resource!

export const metadata: Metadata = {
  title,
}

export default function Page() {
  return <RolesPage title={title} pathname={PATHNAME} resource={resource} />
}
