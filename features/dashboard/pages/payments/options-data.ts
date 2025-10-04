import { FilterOption } from '@typings'
import readersOptionsJson from '@mocks/options/readers.json'

import { methodBadges } from './badges'

export const readersOptions: FilterOption[] = readersOptionsJson.map((reader) => ({
  value: String(reader.value),
  label: reader.label,
}))

export const methodsOptions: FilterOption[] = Object.entries(methodBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
