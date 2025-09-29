import type { Metadata } from 'next'

import { pageMap } from '@/config/page-map'
import { ForgotPasswordPage } from '@/features/auth/pages/forgot-password'

const page = pageMap['/recuperar-contrasena']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <ForgotPasswordPage />
}
