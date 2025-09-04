import { z } from 'zod'

import { FineStatus } from './enums'

export const fineListSchema = z.object({
  id: z.number(),
  code: z.string(),
  loanId: z.number(),
  loanCode: z.string(),
  copyId: z.number(),
  copyCode: z.string(),
  amount: z.number(),
  daysLate: z.number().int(),
  issuedAt: z.coerce.date(),
  status: FineStatus,
})

export type FineList = z.infer<typeof fineListSchema>
