import type { Metadata } from 'next'

import { SettingsDisplayPage } from '@dashboard/pages/settings/pages/display'

import { pageMap } from '@/config/page-map'

const page = pageMap['/ajustes/visualizacion']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsDisplayPage />
}
