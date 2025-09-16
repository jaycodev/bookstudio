import { createFileRoute } from '@tanstack/react-router'

import { ReservationsPage } from '@/features/app/main/loans/reservations'

export const Route = createFileRoute('/_app/prestamos/reservas')({
  component: ReservationsPage,
})
