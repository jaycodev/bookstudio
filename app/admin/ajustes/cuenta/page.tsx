import type { Metadata } from 'next'

import { SettingsAccountPage } from '@admin/pages/settings/pages/account'

import { pageMap } from '@/config/page-map'

const page = pageMap['/ajustes/cuenta']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsAccountPage />
}
