import { FilterOption } from '@/lib/types'
import booksOptionsJson from '@/mocks/options/books.json'

import { conditionBadges, statusBadges } from './badges'

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
