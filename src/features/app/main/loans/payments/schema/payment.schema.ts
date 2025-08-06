import { z } from 'zod'

export const paymentMethodSchema = z.enum([
  'efectivo',
  'tarjeta',
  'transferencia',
  'cheque',
  'otros',
])

export const paymentListSchema = z.object({
  code: z.string(),
  fineCount: z.number(),
  readerCode: z.string(),
  readerFullName: z.string(),
  amount: z.number(),
  paymentDate: z.coerce.date(),
  method: paymentMethodSchema,
  id: z.number(),
})

export type PaymentList = z.infer<typeof paymentListSchema>
