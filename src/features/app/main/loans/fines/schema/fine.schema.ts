import { z } from 'zod'

export const fineStatusSchema = z.enum(['pendiente', 'pagado'])

export const fineListSchema = z.object({
  id: z.number(),
  code: z.string(),
  loanCode: z.string(),
  copyCode: z.string(),
  amount: z.number(),
  daysLate: z.number().int(),
  issuedAt: z.coerce.date(),
  status: fineStatusSchema,
})

export type FineList = z.infer<typeof fineListSchema>
