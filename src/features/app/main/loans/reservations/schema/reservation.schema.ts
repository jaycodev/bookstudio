import { z } from 'zod'

export const reservationStatusSchema = z.enum(['pendiente', 'cancelada', 'atendida'])

export const reservationListSchema = z.object({
  id: z.number(),
  code: z.string(),
  readerCode: z.string(),
  readerFullName: z.string(),
  copyCode: z.string(),
  reservationDate: z.coerce.date(),
  status: reservationStatusSchema,
})

export type ReservationList = z.infer<typeof reservationListSchema>
