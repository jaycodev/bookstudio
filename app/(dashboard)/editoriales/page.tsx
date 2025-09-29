import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { PublishersPage } from '@/features/dashboard/pages/publishers'

const page = pageMap['/editoriales']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <PublishersPage title={page.title} />
}
