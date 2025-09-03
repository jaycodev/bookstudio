import { z } from 'zod'

export const workerSchema = z.object({
  UserID: z.number(),
  Username: z.string(),
  Email: z.string().email(),
  FirstName: z.string(),
  LastName: z.string(),
  Role: z.enum(['administrador', 'bibliotecario']),
  ProfilePhoto: z.string().optional(),
})

export type Worker = z.infer<typeof workerSchema>
