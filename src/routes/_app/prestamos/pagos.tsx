import { createFileRoute } from '@tanstack/react-router'

import PaymentsPage from '@/features/app/main/loans/payments'

export const Route = createFileRoute('/_app/prestamos/pagos')({
  component: PaymentsPage,
})
