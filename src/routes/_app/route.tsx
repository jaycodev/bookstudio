import { createFileRoute } from '@tanstack/react-router'

import AppLayout from '@/features/app/layout'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})
