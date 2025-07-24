import { z } from 'zod'

export const bookSchema = z.object({
  BookID: z.number(),
  Title: z.string(),
  AvailableCopies: z.number(),
  LoanedCopies: z.number(),
  AuthorName: z.string(),
  PublisherName: z.string(),
  Status: z.enum(['activo', 'inactivo']),
})

export type Book = z.infer<typeof bookSchema>
