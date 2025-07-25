import { createFileRoute } from '@tanstack/react-router'

import LoansPage from '@/features/app/loans'

export const Route = createFileRoute('/_app/prestamos/')({
  component: LoansPage,
})
