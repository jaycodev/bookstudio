import { FilterOption } from '@/types/types'

import { statusBadges } from '../components/badges/status.ts'
import loans from '../data/loans.json'

export const readersOptions: FilterOption[] = Array.from(
  new Map(
    loans.map((loan) => [
      loan.readerCode,
      {
        label: loan.readerFullName,
        value: loan.readerCode,
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
