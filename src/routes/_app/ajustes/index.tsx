import { createFileRoute } from '@tanstack/react-router'

import { SettingsPage } from '@/features/app/others/settings'

export const Route = createFileRoute('/_app/ajustes/')({
  component: SettingsPage,
})
