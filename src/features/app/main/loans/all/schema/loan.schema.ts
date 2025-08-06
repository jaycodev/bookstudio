import { z } from 'zod'

export const loanListSchema = z.object({
  code: z.string(),
  readerCode: z.string(),
  readerFullName: z.string(),
  loanDate: z.coerce.date(),
  itemCount: z.number(),
  statusCounts: z.object({
    borrowed: z.number(),
    canceled: z.number(),
    overdue: z.number(),
    lost: z.number(),
    returned: z.number(),
  }),
  id: z.number(),
})

export type LoanList = z.infer<typeof loanListSchema>
