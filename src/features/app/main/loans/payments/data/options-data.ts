import { FilterOption } from '@/types/types'

import { methodBadges } from '../components/badges/method.ts'
import readersOptionsJson from '../data/readers-options.json'

export const readersOptions: FilterOption[] = readersOptionsJson.map((reader) => ({
  value: String(reader.id),
  label: reader.fullName,
}))

export const statusOptions: FilterOption[] = Object.entries(methodBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
