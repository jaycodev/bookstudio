import { z } from 'zod'

import { Status } from '@/features/app/enums/status'

export const authorListSchema = z.object({
  id: z.number(),
  photoUrl: z.string().nullable(),
  name: z.string(),
  nationalityCode: z.string(),
  nationalityName: z.string(),
  birthDate: z.coerce.date(),
  status: Status,
})

export type AuthorList = z.infer<typeof authorListSchema>
