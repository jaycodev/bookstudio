import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { RolesPage } from '@/features/dashboard/pages/roles'

const page = pageMap['/roles']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <RolesPage title={page.title} />
}
