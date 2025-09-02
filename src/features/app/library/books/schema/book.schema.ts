import { z } from 'zod'

export const statusSchema = z.enum(['activo', 'inactivo'])

export const bookListSchema = z.object({
  id: z.number(),
  isbn: z.string(),
  coverUrl: z.string().nullable(),
  title: z.string(),
  categoryName: z.string(),
  publisherName: z.string(),
  languageCode: z.string(),
  languageName: z.string(),
  loanedCopies: z.number(),
  availableCopies: z.number(),
  status: statusSchema,
})

export type BookList = z.infer<typeof bookListSchema>
