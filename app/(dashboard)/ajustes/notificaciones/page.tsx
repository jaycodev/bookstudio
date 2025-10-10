import type { Metadata } from 'next'

import { SettingsNotificationsPage } from '@dashboard/pages/settings/pages/notifications'

import { pageMap } from '@/config/page-map'

const page = pageMap['/ajustes/notificaciones']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <SettingsNotificationsPage />
}
