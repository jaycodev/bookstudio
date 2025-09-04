import { FilterOption } from '@/types/types'

import { statusBadges } from '../components/badges/status.ts'
import reservations from '../data/reservations.json'

export const readersOptions: FilterOption[] = Array.from(
  new Map(
    reservations.map((reservation) => [
      reservation.readerCode,
      {
        label: reservation.readerFullName,
        value: reservation.readerCode,
      },
    ])
  ).values()
)

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
