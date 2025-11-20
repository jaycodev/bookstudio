import { z } from 'zod'

import { filterOptionsArraySchema } from '@/lib/schemas/common/filter-option.schema'

export const loanFilterOptionsSchema = z.object({
  readers: filterOptionsArraySchema,
})

export type LoanFilterOptions = z.infer<typeof loanFilterOptionsSchema>

export type LoanFilterOptionsParams = Partial<LoanFilterOptions>
