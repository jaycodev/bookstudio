import { statusBadges } from '@admin/components/badges'

import { FilterOption } from '@/lib/types'
import nationalitiesOptionsJson from '@/mocks/options/nationalities.json'

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
