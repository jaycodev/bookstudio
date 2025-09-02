import { z } from 'zod'

export const statusSchema = z.enum(['activo', 'inactivo'])

export const authorListSchema = z.object({
  photoUrl: z.string().nullable(),
  name: z.string(),
  nationalityCode: z.string(),
  nationalityName: z.string(),
  birthDate: z.coerce.date(),
  status: statusSchema,
  id: z.number(),
})

export type AuthorList = z.infer<typeof authorListSchema>
