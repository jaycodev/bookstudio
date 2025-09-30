import { FilterOption } from '@typings'
import nationalitiesOptionsJson from '@mocks/options/nationalities.json'
import { statusBadges } from '@dashboard/components/badges'

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
