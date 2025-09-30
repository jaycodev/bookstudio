import { FilterOption } from '@typings'
import rolesOptionsJson from '@mocks/options/roles.json'

import { statusBadges } from './badges'

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
