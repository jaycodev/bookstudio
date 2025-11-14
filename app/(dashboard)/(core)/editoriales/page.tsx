import type { Metadata } from 'next'

import { PublishersPage } from '@dashboard/pages/publishers'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/editoriales'
const page = pageMap[PATHNAME]

const title = page.title
const resource = page.resource!

export const metadata: Metadata = {
  title,
}

export default function Page() {
  return <PublishersPage title={title} pathname={PATHNAME} resource={resource} />
}
