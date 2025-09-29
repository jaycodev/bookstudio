import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { SettingsPage } from '@/features/dashboard/pages/settings'

const page = pageMap['/ajustes']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsPage />
}
