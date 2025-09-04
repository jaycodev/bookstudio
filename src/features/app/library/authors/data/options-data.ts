import { statusBadges } from '@/features/app/components/badges/status.ts'
import { FilterOption } from '@/types/types'

import nationalitiesOptionsJson from '../data/nationalities-options.json'

export const nationalitiesOptions: FilterOption[] = nationalitiesOptionsJson.map((nationality) => ({
  value: String(nationality.id),
  label: nationality.name,
}))

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
