import { ReactNode } from 'react'

import { DashboardLayout } from '@dashboard/layout'
import { SettingsLayout } from '@dashboard/pages/settings/layout'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <DashboardLayout fixed>
      <SettingsLayout>{children}</SettingsLayout>
    </DashboardLayout>
  )
}
