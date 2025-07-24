import { z } from 'zod'

export const userSchema = z.object({
  UserID: z.number(),
  Username: z.string(),
  Email: z.string().email(),
  FirstName: z.string(),
  LastName: z.string(),
  Role: z.enum(['administrador', 'bibliotecario']),
  ProfilePhoto: z.string().optional(),
})

export type User = z.infer<typeof userSchema>
