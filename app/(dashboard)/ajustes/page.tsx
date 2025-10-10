import type { Metadata } from 'next'

import { SettingsProfilePage } from '@dashboard/pages/settings/pages/profile'

import { pageMap } from '@/config/page-map'

const page = pageMap['/ajustes']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsProfilePage />
}
