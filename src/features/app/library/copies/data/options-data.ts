import { FilterOption } from '@/types/types'

import { conditionBadges } from '../components/badges/condition.ts'
import { statusBadges } from '../components/badges/status.ts'
import booksOptionsJson from '../data/books-options.json'

export const booksOptions: FilterOption[] = booksOptionsJson.map((book) => ({
  value: String(book.value),
  label: book.label,
}))

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
