import { z } from 'zod'

import { filterOptionsArraySchema } from '@/lib/schemas/common/filter-option.schema'

export const bookFilterOptionsSchema = z.object({
  categories: filterOptionsArraySchema,
  publishers: filterOptionsArraySchema,
  languages: filterOptionsArraySchema,
})

export type BookFilterOptions = z.infer<typeof bookFilterOptionsSchema>

export type BookFilterOptionsParams = Partial<BookFilterOptions>
