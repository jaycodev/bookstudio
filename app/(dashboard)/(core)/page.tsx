import type { Metadata } from 'next'

import { DashboardPage } from '@dashboard/pages/dashboard'

import { pageMap } from '@/config/page-map'

const page = pageMap['/']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <DashboardPage />
}
