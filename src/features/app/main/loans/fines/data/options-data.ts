import { FilterOption } from '@/types/types'

import { statusBadges } from '../components/badges/status.ts'
import copiesOptionsJson from '../data/copies-options.json'
import loansOptionsJson from '../data/loans-options.json'

export const loansOptions: FilterOption[] = loansOptionsJson.map((loan) => ({
  value: String(loan.id),
  label: loan.code,
}))

export const copiesOptions: FilterOption[] = copiesOptionsJson.map((copy) => ({
  value: String(copy.id),
  label: copy.code,
}))

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
