import { z } from 'zod'

export const loanSchema = z.object({
  LoanID: z.number(),
  BookTitle: z.string(),
  StudentDNI: z.string(),
  LoanDate: z.coerce.date(),
  ReturnDate: z.coerce.date(),
  Quantity: z.number(),
  Status: z.enum(['prestado', 'devuelto']),
})

export type Loan = z.infer<typeof loanSchema>
