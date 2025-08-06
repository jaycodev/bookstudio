import { FilterOption } from '@/types/types'

import { statusIconsAndLabels } from '../config/status-icons.ts'
import payments from '../data/payments.json'

export const readersOptions: FilterOption[] = Array.from(
  new Map(
    payments.map((payment) => [
      payment.readerCode,
      {
        label: payment.readerFullName,
        value: payment.readerCode,
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
