import { BookCheck, BookX, CircleCheck, XCircle } from 'lucide-react'

import { FilterOption } from '@/types/types'

import { statusIconsAndLabels } from '../config/status-icons.ts'
import books from '../data/books.json'

export const categoriesOptions: FilterOption[] = Array.from(
  new Map(
    books.map((book) => [
      book.categoryName,
      {
        label: book.categoryName,
        value: book.categoryName,
      },
    ])
  ).values()
)

export const publishersOptions: FilterOption[] = Array.from(
  new Map(
    books.map((book) => [
      book.publisherName,
      {
        label: book.publisherName,
        value: book.publisherName,
      },
    ])
  ).values()
)

export const languagesOptions: FilterOption[] = Array.from(
  new Map(
    books.map((book) => [
      book.languageCode,
      {
        label: book.languageName,
        value: book.languageCode,
      },
    ])
  ).values()
)

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

export const statusOptions: FilterOption[] = Object.entries(statusIconsAndLabels).map(
  ([key, { label, icon }]) => ({
    value: key,
    label,
    icon,
  })
)
