import { z } from 'zod'

export const readerSchema = z.object({
  StudentID: z.number(),
  DNI: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Phone: z.string().optional(),
  Email: z.string(),
  Status: z.enum(['activo', 'inactivo']),
})

export type Reader = z.infer<typeof readerSchema>
