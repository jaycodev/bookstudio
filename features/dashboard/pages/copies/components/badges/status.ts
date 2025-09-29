import {
  AlertTriangle,
  CircleCheckBig,
  Clock,
  Handshake,
  type LucideIcon,
  Wrench,
} from 'lucide-react'

export const statusBadges = {
  DISPONIBLE: {
    label: 'Disponible',
    icon: CircleCheckBig,
    variant: 'success',
  },
  PRESTADO: {
    label: 'Prestado',
    icon: Handshake,
    variant: 'info',
  },
  RESERVADO: {
    label: 'Reservado',
    icon: Clock,
    variant: 'warning',
  },
  EXTRAVIADO: {
    label: 'Extraviado',
    icon: AlertTriangle,
    variant: 'danger',
  },
  MANTENIMIENTO: {
    label: 'Mantenimiento',
    icon: Wrench,
    variant: 'muted',
  },
} as const

export type Status = keyof typeof statusBadges

export type StatusBadgeMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
