import { FilterOption } from '@/types/types'

import { statusIconsAndLabels } from '../config/status-icons.ts'
import publishers from '../data/publishers.json'

export const nationalitiesOptions: FilterOption[] = Array.from(
  new Map(
    publishers.map((publisher) => [
      publisher.nationalityCode,
      {
        label: publisher.nationalityName,
        value: publisher.nationalityCode,
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
