import { z } from 'zod'

export const reservationStatusSchema = z.enum(['pendiente', 'cancelada', 'atendida'])

export const reservationListSchema = z.object({
  code: z.string(),
  readerCode: z.string(),
  readerFullName: z.string(),
  copyCode: z.string(),
  reservationDate: z.coerce.date(),
  status: reservationStatusSchema,
  id: z.number(),
})

export type ReservationList = z.infer<typeof reservationListSchema>
