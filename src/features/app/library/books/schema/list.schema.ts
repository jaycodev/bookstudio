import { z } from 'zod'

import { Status } from '@/shared/enums/status.enum'

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
  status: Status,
})

export type BookList = z.infer<typeof bookListSchema>
