import { statusBadges } from '@dashboard/components/badges'

import nationalitiesOptionsJson from '@/mocks/options/nationalities.json'
import { FilterOption } from '@/typings/types'

export const nationalitiesOptions: FilterOption[] = nationalitiesOptionsJson.map((nationality) => ({
  value: String(nationality.value),
  label: nationality.label,
}))

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
