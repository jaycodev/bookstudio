import { z } from 'zod'

import { ReservationStatus } from './enums'

export const reservationListSchema = z.object({
  id: z.number(),
  code: z.string(),
  readerId: z.number(),
  readerCode: z.string(),
  readerFullName: z.string(),
  copyCode: z.string(),
  reservationDate: z.coerce.date(),
  status: ReservationStatus,
})

export type ReservationList = z.infer<typeof reservationListSchema>
