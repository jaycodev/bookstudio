import { z } from 'zod'

import { Status } from '@/features/dashboard/enums/status'

export const authorListSchema = z.object({
  id: z.number(),
  photoUrl: z.string().nullable(),
  name: z.string(),
  nationality: z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
  }),
  birthDate: z.coerce.date(),
  status: Status,
})

export type AuthorList = z.infer<typeof authorListSchema>
