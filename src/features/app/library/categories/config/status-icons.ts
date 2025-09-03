import { Ban, CheckCircle, type LucideIcon } from 'lucide-react'

export const statusIconsAndLabels = {
  activo: {
    label: 'Activo',
    icon: CheckCircle,
    variant: 'success',
  },
  inactivo: {
    label: 'Inactivo',
    icon: Ban,
    variant: 'danger',
  },
} as const

export type CategoryStatus = keyof typeof statusIconsAndLabels

export type CategoryStatusIconMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
