import { z } from 'zod'

export const conditionSchema = z.enum(['nuevo', 'bueno', 'regular', 'malo', 'deteriorado'])

export const copyListSchema = z.object({
  code: z.string(),
  bookCoverUrl: z.string().nullable(),
  bookTitle: z.string(),
  shelfCode: z.string(),
  shelfFloor: z.string(),
  locationName: z.string(),
  isAvailable: z.boolean(),
  condition: conditionSchema,
  id: z.number(),
})

export type CopyList = z.infer<typeof copyListSchema>
