import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { DashboardPage } from '@/features/dashboard/pages/dashboard'

const page = pageMap['/']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <DashboardPage />
}
