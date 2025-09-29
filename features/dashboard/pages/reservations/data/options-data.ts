import { FilterOption } from '@/types/types'

import { statusBadges } from '../components/badges/status'
import readersOptionsJson from './readers-options.json'

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
