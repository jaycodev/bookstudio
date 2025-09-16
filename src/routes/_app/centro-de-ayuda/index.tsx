import { createFileRoute } from '@tanstack/react-router'

import { ComingSoon } from '@/components/shared/coming-soon'

export const Route = createFileRoute('/_app/centro-de-ayuda/')({
  component: ComingSoon,
})
