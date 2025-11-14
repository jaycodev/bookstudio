import type { Metadata } from 'next'

import { DashboardPage } from '@dashboard/pages/dashboard'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/'
const page = pageMap[PATHNAME]

const title = page.title

export const metadata: Metadata = {
  title,
}

export default function Page() {
  return <DashboardPage />
}
