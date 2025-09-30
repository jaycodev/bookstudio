import { z } from 'zod'

import { Status } from '@dashboard/enums/status'

export const publisherListSchema = z.object({
  id: z.number(),
  photoUrl: z.string().nullable(),
  name: z.string(),
  nationality: z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
  }),
  website: z.string().nullable(),
  address: z.string().nullable(),
  status: Status,
})

export type PublisherList = z.infer<typeof publisherListSchema>
