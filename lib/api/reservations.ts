import {
  type ReservationList,
  reservationListSchema,
} from '@/lib/schemas/reservation/reservation.list.schema'

import { apiClient } from './client'

export const reservationsApi = {
  async getAll(): Promise<ReservationList[]> {
    const data = await apiClient.get('/reservations', {
      cache: 'no-store',
    })
    return reservationListSchema.array().parse(data)
  },
}
