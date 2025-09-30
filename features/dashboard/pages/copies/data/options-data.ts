import { FilterOption } from '@typings'

import { conditionBadges } from '../components/badges/condition'
import { statusBadges } from '../components/badges/status'
import booksOptionsJson from './books-options.json'

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
