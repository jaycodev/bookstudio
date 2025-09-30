import { BookCheck, BookX, CircleCheck, XCircle } from 'lucide-react'

import { FilterOption } from '@typings'
import categoriesOptionsJson from '@mocks/options/categories.json'
import languagesOptionsJson from '@mocks/options/languages.json'
import publishersOptionsJson from '@mocks/options/publishers.json'
import { statusBadges } from '@dashboard/components/badges'

export const categoriesOptions: FilterOption[] = categoriesOptionsJson.map((category) => ({
  value: String(category.value),
  label: category.label,
}))

export const publishersOptions: FilterOption[] = publishersOptionsJson.map((publisher) => ({
  value: String(publisher.value),
  label: publisher.label,
}))

export const languagesOptions: FilterOption[] = languagesOptionsJson.map((language) => ({
  value: String(language.value),
  label: language.label,
}))

export const loanOptions: FilterOption[] = [
  {
    label: 'Sí',
    value: 'loaned',
    icon: BookCheck,
  },
  {
    label: 'No',
    value: 'notLoaned',
    icon: BookX,
  },
]

export const availabilityOptions: FilterOption[] = [
  {
    label: 'Sí',
    value: 'available',
    icon: CircleCheck,
  },
  {
    label: 'No',
    value: 'notAvailable',
    icon: XCircle,
  },
]

export const statusOptions: FilterOption[] = Object.entries(statusBadges).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
