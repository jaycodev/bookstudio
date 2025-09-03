import { z } from 'zod'

import { Status } from '@/shared/enums/status.enum'

export const publisherListSchema = z.object({
  id: z.number(),
  photoUrl: z.string().nullable(),
  name: z.string(),
  nationalityCode: z.string(),
  nationalityName: z.string(),
  website: z.string().nullable(),
  address: z.string().nullable(),
  status: Status,
})

export type PublisherList = z.infer<typeof publisherListSchema>
