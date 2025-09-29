import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { NotFoundErrorPage } from '@/features/error/pages/not-found'

const page = pageMap['/error/404']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <NotFoundErrorPage />
}
