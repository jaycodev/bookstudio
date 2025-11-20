import { z } from 'zod'

import { filterOptionsArraySchema } from '@/lib/schemas/common/filter-option.schema'

export const reservationFilterOptionsSchema = z.object({
  readers: filterOptionsArraySchema,
})

export type ReservationFilterOptions = z.infer<typeof reservationFilterOptionsSchema>

export type ReservationFilterOptionsParams = Partial<ReservationFilterOptions>
