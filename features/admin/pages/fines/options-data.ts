import { FilterOption } from '@/lib/types'
import copiesOptionsJson from '@/mocks/options/copies.json'
import loansOptionsJson from '@/mocks/options/loans.json'

import { statusBadges } from './badges'

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
