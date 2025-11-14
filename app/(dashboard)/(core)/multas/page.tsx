import type { Metadata } from 'next'

import { FinesPage } from '@dashboard/pages/fines'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/multas'
const page = pageMap[PATHNAME]

const title = page.title
const resource = page.resource!

export const metadata: Metadata = {
  title,
}

export default function Page() {
  return <FinesPage title={title} pathname={PATHNAME} resource={resource} />
}
