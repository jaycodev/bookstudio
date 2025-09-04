import { FilterOption } from '@/types/types'

import { statusBadges } from '../components/badges/status.ts'
import fines from '../data/fines.json'

export const loansOptions: FilterOption[] = Array.from(
  new Map(
    fines.map((fine) => [
      fine.loanCode,
      {
        label: fine.loanCode,
        value: fine.loanCode,
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
