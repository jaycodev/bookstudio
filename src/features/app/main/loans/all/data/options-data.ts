import { FilterOption } from '@/types/types'

import { statusBadges } from '../components/badges/status.ts'
import readersOptionsJson from '../data/readers-options.json'

export const readersOptions: FilterOption[] = readersOptionsJson.map((reader) => ({
  value: String(reader.value),
  label: reader.label,
}))

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
