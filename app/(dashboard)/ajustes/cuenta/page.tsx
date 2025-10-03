import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { SettingsAccountPage } from '@dashboard/pages/settings/pages/account'

const page = pageMap['/ajustes/cuenta']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsAccountPage />
}
