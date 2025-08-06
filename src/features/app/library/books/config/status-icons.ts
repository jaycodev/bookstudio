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

export type ReservationStatus = keyof typeof statusIconsAndLabels

export type ReservationStatusIconMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
