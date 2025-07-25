import { createFileRoute } from '@tanstack/react-router'

import ProfilePage from '@/features/app/profile'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage,
})
