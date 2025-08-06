import { Ban, CheckCircle, Clock, type LucideIcon } from 'lucide-react'

export const statusIconsAndLabels = {
  pendiente: {
    label: 'Pendiente',
    icon: Clock,
    variant: 'warning',
  },
  atendida: {
    label: 'Atendida',
    icon: CheckCircle,
    variant: 'success',
  },
  cancelada: {
    label: 'Cancelada',
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
