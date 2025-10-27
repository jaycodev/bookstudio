import readersOptionsJson from '@/mocks/options/readers.json'
import { FilterOption } from '@/typings/types'

import { statusBadges } from './badges'

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
