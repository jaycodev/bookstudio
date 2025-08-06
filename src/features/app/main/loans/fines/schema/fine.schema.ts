import { z } from 'zod'

export const fineStatusSchema = z.enum(['pendiente', 'pagado'])

export const fineListSchema = z.object({
  code: z.string(),
  loanCode: z.string(),
  copyCode: z.string(),
  amount: z.number(),
  daysLate: z.number().int(),
  issuedAt: z.coerce.date(),
  status: fineStatusSchema,
  id: z.number(),
})

export type FineList = z.infer<typeof fineListSchema>
