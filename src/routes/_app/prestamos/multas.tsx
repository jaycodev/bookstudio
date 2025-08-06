import { createFileRoute } from '@tanstack/react-router'

import FinesPage from '@/features/app/main/loans/fines'

export const Route = createFileRoute('/_app/prestamos/multas')({
  component: FinesPage,
})
