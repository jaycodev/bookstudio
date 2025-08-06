import { FilterOption } from '@/types/types'

import { statusIconsAndLabels } from '../config/status-icons.ts'
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

export const statusOptions: FilterOption[] = Object.entries(statusIconsAndLabels).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
