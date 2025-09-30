import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { ForbiddenErrorPage } from '@error/pages/forbidden'

const page = pageMap['/error/403']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <ForbiddenErrorPage />
}
