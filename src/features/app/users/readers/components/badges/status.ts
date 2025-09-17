import { AlertTriangle, CircleCheckBig, CircleMinus, type LucideIcon, Trash } from 'lucide-react'

export const statusBadges = {
  ACTIVO: {
    label: 'Activo',
    icon: CircleCheckBig,
    variant: 'success',
  },
  SUSPENDIDO: {
    label: 'Suspendido',
    icon: AlertTriangle,
    variant: 'warning',
  },
  BLOQUEADO: {
    label: 'Bloqueado',
    icon: CircleMinus,
    variant: 'muted',
  },
  ELIMINADO: {
    label: 'Eliminado',
    icon: Trash,
    variant: 'danger',
  },
} as const

export type Status = keyof typeof statusBadges

export type StatusBadgeMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
