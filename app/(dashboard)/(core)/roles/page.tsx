import type { Metadata } from 'next'

import { RolesPage } from '@dashboard/pages/roles'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/roles'
const RESOURCE = 'roles'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <RolesPage title={page.title} pathname={PATHNAME} resource={RESOURCE} />
}
