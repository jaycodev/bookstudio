import { BookCheck, BookX, CircleCheck, XCircle } from 'lucide-react'

import { statusBadges } from '@/features/app/components/badges/status.ts'
import { FilterOption } from '@/types/types'

import categoriesOptionsJson from '../data/categories-options.json'
import languagesOptionsJson from '../data/languages-options.json'
import publishersOptionsJson from '../data/publishers.options.json'

export const categoriesOptions: FilterOption[] = categoriesOptionsJson.map((category) => ({
  value: String(category.id),
  label: category.name,
}))

export const publishersOptions: FilterOption[] = publishersOptionsJson.map((publisher) => ({
  value: String(publisher.id),
  label: publisher.name,
}))

export const languagesOptions: FilterOption[] = languagesOptionsJson.map((language) => ({
  value: String(language.id),
  label: language.name,
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
