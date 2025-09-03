import { z } from 'zod'

export const statusSchema = z.enum(['activo', 'suspendido', 'eliminado'])
export const categoryLevelSchema = z.enum(['primaria', 'secundaria', 'superior', 'general'])

export const categoryListSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: categoryLevelSchema,
  description: z.string(),
  status: statusSchema,
})

export type CategoryList = z.infer<typeof categoryListSchema>
