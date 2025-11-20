import { z } from 'zod'

import { filterOptionsArraySchema } from '@/lib/schemas/common/filter-option.schema'

export const workerFilterOptionsSchema = z.object({
  roles: filterOptionsArraySchema,
})

export type WorkerFilterOptions = z.infer<typeof workerFilterOptionsSchema>

export type WorkerFilterOptionsParams = Partial<WorkerFilterOptions>
