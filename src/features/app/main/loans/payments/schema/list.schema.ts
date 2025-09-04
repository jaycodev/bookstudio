import { z } from 'zod'

import { PaymentMethod } from './enums'

export const paymentListSchema = z.object({
  id: z.number(),
  code: z.string(),
  fineCount: z.number(),
  readerId: z.number(),
  readerCode: z.string(),
  readerFullName: z.string(),
  amount: z.number(),
  paymentDate: z.coerce.date(),
  method: PaymentMethod,
})

export type PaymentList = z.infer<typeof paymentListSchema>
