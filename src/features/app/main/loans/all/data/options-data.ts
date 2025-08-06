import { FilterOption } from '@/types/types'

import { statusIconsAndLabels } from '../config/status-icons.ts'
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

export const statusOptions: FilterOption[] = Object.entries(statusIconsAndLabels).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
