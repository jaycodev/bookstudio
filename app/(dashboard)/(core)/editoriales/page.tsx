import type { Metadata } from 'next'

import { PublishersPage } from '@dashboard/pages/publishers'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/editoriales'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <PublishersPage title={page.title} pathname={PATHNAME} />
}
