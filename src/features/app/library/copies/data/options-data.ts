import { CheckCircle2, XCircle } from 'lucide-react'

import { FilterOption } from '@/types/types'

import { conditionIconsAndLabels } from '../config/condition-icons.ts'
import copies from '../data/copies.json'

export const booksOptions: FilterOption[] = Array.from(
  new Map(
    copies.map((copy) => [
      copy.bookTitle,
      {
        label: copy.bookTitle,
        value: copy.bookTitle,
      },
    ])
  ).values()
)

export const availabilityOptions: FilterOption[] = [
  {
    value: 'true',
    label: 'Sí',
    icon: CheckCircle2,
  },
  {
    value: 'false',
    label: 'No',
    icon: XCircle,
  },
]

export const conditionsOptions: FilterOption[] = Object.entries(conditionIconsAndLabels).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
