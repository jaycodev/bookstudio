import { createFileRoute } from '@tanstack/react-router'

import LoansPage from '@/pages/dashboard/Loans/LoansPage'

export const Route = createFileRoute('/_authenticated/loans')({
  component: LoansPage,
})
