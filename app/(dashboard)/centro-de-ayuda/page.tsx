import type { Metadata } from 'next'

import { ComingSoon } from '@/components/shared/coming-soon'
import { pageMap } from '@/config/page-map'

const page = pageMap['/centro-de-ayuda']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <ComingSoon />
}
