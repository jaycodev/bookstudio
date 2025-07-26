import { z } from 'zod'

export const categorySchema = z.object({
  CourseID: z.number(),
  Name: z.string(),
  Level: z.string(),
  Description: z.string(),
  Status: z.enum(['activo', 'inactivo']),
})

export type Category = z.infer<typeof categorySchema>
