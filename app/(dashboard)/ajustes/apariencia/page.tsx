import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { SettingsAppearancePage } from '@dashboard/pages/settings/pages/appearance'

const page = pageMap['/ajustes/apariencia']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsAppearancePage />
}
