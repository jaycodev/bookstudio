import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { UnauthorisedErrorPage } from '@/features/error/pages/unauthorized'

const page = pageMap['/error/401']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <UnauthorisedErrorPage />
}
