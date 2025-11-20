import { z } from 'zod'

import { filterOptionsArraySchema } from '@/lib/schemas/common/filter-option.schema'

export const copiesFilterOptionsSchema = z.object({
  books: filterOptionsArraySchema,
})

export type CopiesFilterOptions = z.infer<typeof copiesFilterOptionsSchema>

export type CopiesFilterOptionsParams = Partial<CopiesFilterOptions>
