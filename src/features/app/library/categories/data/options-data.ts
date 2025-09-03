import { FilterOption } from '@/types/types'

import { levelIconsAndLabels } from '../config/level-icons'
import { statusIconsAndLabels } from '../config/status-icons'

export const levelOptions: FilterOption[] = Object.entries(levelIconsAndLabels).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)

export const statusOptions: FilterOption[] = Object.entries(statusIconsAndLabels).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
