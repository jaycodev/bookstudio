import { createFileRoute } from '@tanstack/react-router'

import LoansPage from '@/features/app/loans'

export const Route = createFileRoute('/_app/prestamos/en-curso')({
  component: LoansPage,
})
