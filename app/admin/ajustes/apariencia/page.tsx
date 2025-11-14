import type { Metadata } from 'next'

import { SettingsAppearancePage } from '@admin/pages/settings/pages/appearance'

import { pageMap } from '@/config/page-map'

const page = pageMap['/ajustes/apariencia']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsAppearancePage />
}
