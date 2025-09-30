import { FilterOption } from '@typings'
import { statusBadges } from '@dashboard/components/badges'

import { levelBadges } from '../components/badges/level'

export const levelOptions: FilterOption[] = Object.entries(levelBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
