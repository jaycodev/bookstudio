import { statusBadges } from '@/features/app/components/badges/status'
import { FilterOption } from '@/types/types'

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
