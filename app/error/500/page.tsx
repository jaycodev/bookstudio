import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { GeneralErrorPage } from '@error/pages/general'

const page = pageMap['/error/500']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <GeneralErrorPage />
}
