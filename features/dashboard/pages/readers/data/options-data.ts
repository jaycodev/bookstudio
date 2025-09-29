import { FilterOption } from '@/types/types'

import { statusBadges } from '../components/badges/status'
import { typeBadges } from '../components/badges/type'

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)

export const typeOptions: FilterOption[] = Object.entries(typeBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
