import { FilterOption } from '@/types/types'

import { conditionBadges } from '../components/badges/condition.ts'
import { statusBadges } from '../components/badges/status.ts'
import copies from '../data/copies.json'

export const booksOptions: FilterOption[] = Array.from(
  new Map(
    copies.map((copy) => [
      copy.bookTitle,
      {
        label: copy.bookTitle,
        value: copy.bookTitle,
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

export const conditionsOptions: FilterOption[] = Object.entries(conditionBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
