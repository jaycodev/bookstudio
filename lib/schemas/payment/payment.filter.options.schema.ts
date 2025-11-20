import { z } from 'zod'

import { filterOptionsArraySchema } from '@/lib/schemas/common/filter-option.schema'

export const paymentFilterOptionsSchema = z.object({
  readers: filterOptionsArraySchema,
})

export type PaymentFilterOptions = z.infer<typeof paymentFilterOptionsSchema>

export type PaymentFilterOptionsParams = Partial<PaymentFilterOptions>
