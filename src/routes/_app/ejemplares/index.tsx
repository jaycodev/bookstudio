import { createFileRoute } from '@tanstack/react-router'

import CopiesPage from '@/features/app/library/copies'

export const Route = createFileRoute('/_app/ejemplares/')({
  component: CopiesPage,
})
