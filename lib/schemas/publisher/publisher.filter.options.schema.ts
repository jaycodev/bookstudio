import { z } from 'zod'

import { filterOptionsArraySchema } from '@/lib/schemas/common/filter-option.schema'

export const publisherFilterOptionsSchema = z.object({
  nationalities: filterOptionsArraySchema,
})

export type PublisherFilterOptions = z.infer<typeof publisherFilterOptionsSchema>

export type PublisherFilterOptionsParams = Partial<PublisherFilterOptions>
