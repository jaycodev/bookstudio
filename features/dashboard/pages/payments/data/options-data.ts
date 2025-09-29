import { FilterOption } from '@/types/types'

import { methodBadges } from '../components/badges/method'
import readersOptionsJson from './readers-options.json'

export const readersOptions: FilterOption[] = readersOptionsJson.map((reader) => ({
  value: String(reader.value),
  label: reader.label,
}))

export const statusOptions: FilterOption[] = Object.entries(methodBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
