import { z } from 'zod'

export const statusSchema = z.enum(['activo', 'suspendido', 'eliminado'])

export const publisherListSchema = z.object({
  id: z.number(),
  photoUrl: z.string().nullable(),
  name: z.string(),
  nationalityCode: z.string(),
  nationalityName: z.string(),
  website: z.string().nullable(),
  address: z.string().nullable(),
  status: statusSchema,
})

export type PublisherList = z.infer<typeof publisherListSchema>
