import { z } from 'zod'

import { Status } from '@/features/dashboard/enums/status'

import { CategoryLevel } from './enums'

export const categoryListSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: CategoryLevel,
  description: z.string(),
  status: Status,
})

export type CategoryList = z.infer<typeof categoryListSchema>
