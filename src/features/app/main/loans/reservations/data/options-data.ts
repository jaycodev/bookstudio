import { FilterOption } from '@/types/types'

import { statusIconsAndLabels } from '../config/status-icons.ts'
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

export const statusOptions: FilterOption[] = Object.entries(statusIconsAndLabels).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
