import { FilterOption } from '@/types/types'

import { statusIconsAndLabels } from '../config/status-icons.ts'
import authors from '../data/authors.json'

export const nationalitiesOptions: FilterOption[] = Array.from(
  new Map(
    authors.map((author) => [
      author.nationalityCode,
      {
        label: author.nationalityName,
        value: author.nationalityCode,
      },
    ])
  ).values()
)

export const statusOptions: FilterOption[] = Object.entries(statusIconsAndLabels).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
