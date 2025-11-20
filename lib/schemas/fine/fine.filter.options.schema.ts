import { z } from 'zod'

import { filterOptionsArraySchema } from '@/lib/schemas/common/filter-option.schema'

export const fineFilterOptionsSchema = z.object({
  loans: filterOptionsArraySchema,
  copies: filterOptionsArraySchema,
})

export type FineFilterOptions = z.infer<typeof fineFilterOptionsSchema>

export type FineFilterOptionsParams = Partial<FineFilterOptions>
