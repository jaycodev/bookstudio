import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { LoginPage } from '@auth/pages/login'

const page = pageMap['/iniciar-sesion']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <LoginPage />
}
