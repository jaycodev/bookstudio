import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { SettingsDisplayPage } from '@dashboard/pages/settings/pages/display'

const page = pageMap['/ajustes/visualizacion']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsDisplayPage />
}
