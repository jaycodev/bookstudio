import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { SettingsNotificationsPage } from '@dashboard/pages/settings/pages/notifications'

const page = pageMap['/ajustes/notificaciones']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsNotificationsPage />
}
