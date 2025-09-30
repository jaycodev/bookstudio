import { FilterOption } from '@typings'

import { statusBadges } from '../components/badges/status'
import copiesOptionsJson from './copies-options.json'
import loansOptionsJson from './loans-options.json'

export const loansOptions: FilterOption[] = loansOptionsJson.map((loan) => ({
  value: String(loan.value),
  label: loan.label,
}))

export const copiesOptions: FilterOption[] = copiesOptionsJson.map((copy) => ({
  value: String(copy.value),
  label: copy.label,
}))

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
