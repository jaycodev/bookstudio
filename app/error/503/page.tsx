import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { MaintenanceErrorPage } from '@/features/error/pages/maintenance'

const page = pageMap['/error/503']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <MaintenanceErrorPage />
}
