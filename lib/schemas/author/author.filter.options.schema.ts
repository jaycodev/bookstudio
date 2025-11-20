import { z } from 'zod'

import { filterOptionsArraySchema } from '@/lib/schemas/common/filter-option.schema'

export const authorFilterOptionsSchema = z.object({
  nationalities: filterOptionsArraySchema,
})

export type AuthorFilterOptions = z.infer<typeof authorFilterOptionsSchema>

export type AuthorFilterOptionsParams = Partial<AuthorFilterOptions>
