import { createFileRoute } from '@tanstack/react-router'

import { LoansPage } from '@/features/app/main/loans/all'

export const Route = createFileRoute('/_app/prestamos/')({
  component: LoansPage,
})
