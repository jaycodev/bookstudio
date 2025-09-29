import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { ResetPasswordPage } from '@/features/auth/pages/reset-password'

const page = pageMap['/restablecer-contrasena']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <ResetPasswordPage />
}
