import { z } from 'zod'

import { CopyCondition, CopyStatus } from './enums'

export const copyListSchema = z.object({
  id: z.number(),
  code: z.string(),
  bookId: z.number(),
  bookCoverUrl: z.string().nullable(),
  bookTitle: z.string(),
  shelfCode: z.string(),
  shelfFloor: z.string(),
  locationName: z.string(),
  status: CopyStatus,
  condition: CopyCondition,
})

export type CopyList = z.infer<typeof copyListSchema>
