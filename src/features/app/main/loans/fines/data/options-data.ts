import { FilterOption } from '@/types/types'

import { statusBadges } from '../components/badges/status.ts'
import copiesOptionsJson from '../data/copies-options.json'
import loansOptionsJson from '../data/loans-options.json'

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
