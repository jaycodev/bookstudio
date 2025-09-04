import { z } from 'zod'

import { Status } from '@/features/app/enums/status'

export const bookListSchema = z.object({
  id: z.number(),
  isbn: z.string(),
  coverUrl: z.string().nullable(),
  title: z.string(),
  categoryId: z.number(),
  categoryName: z.string(),
  publisherId: z.number(),
  publisherName: z.string(),
  languageId: z.number(),
  languageCode: z.string(),
  languageName: z.string(),
  loanedCopies: z.number(),
  availableCopies: z.number(),
  status: Status,
})

export type BookList = z.infer<typeof bookListSchema>
