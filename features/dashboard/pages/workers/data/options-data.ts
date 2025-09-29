import { FilterOption } from '@/types/types'

import { statusBadges } from '../components/badges/status'
import rolesOptionsJson from './roles-options.json'

export const rolesOptions: FilterOption[] = rolesOptionsJson.map((role) => ({
  value: String(role.value),
  label: role.label,
}))

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
