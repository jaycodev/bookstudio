import { z } from 'zod'

export const filterOptionSchema = z.object({
  value: z.string().or(z.number()).transform(String),
  label: z.string(),
})

export type FilterOption = z.infer<typeof filterOptionSchema>

export const filterOptionsArraySchema = z.array(filterOptionSchema)
