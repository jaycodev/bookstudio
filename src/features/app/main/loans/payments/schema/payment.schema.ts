import { z } from 'zod'

export const paymentMethodSchema = z.enum([
  'efectivo',
  'tarjeta',
  'transferencia',
  'cheque',
  'otros',
])

export const paymentListSchema = z.object({
  id: z.number(),
  code: z.string(),
  fineCount: z.number(),
  readerCode: z.string(),
  readerFullName: z.string(),
  amount: z.number(),
  paymentDate: z.coerce.date(),
  method: paymentMethodSchema,
})

export type PaymentList = z.infer<typeof paymentListSchema>
