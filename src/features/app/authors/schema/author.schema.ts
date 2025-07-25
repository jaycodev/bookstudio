import { z } from 'zod'

export const authorSchema = z.object({
  AuthorID: z.number(),
  Name: z.string(),
  NationalityName: z.string(),
  LiteraryGenreName: z.string(),
  Status: z.enum(['activo', 'inactivo']),
  Photo: z.string().optional(),
})

export type Author = z.infer<typeof authorSchema>
