import { AlertTriangle, Ban, BookCheck, Clock, type LucideIcon, Undo2 } from 'lucide-react'

export const statusIconsAndLabels = {
  borrowed: {
    label: 'Prestado',
    icon: BookCheck,
    variant: 'info',
  },
  returned: {
    label: 'Devuelto',
    icon: Undo2,
    variant: 'success',
  },
  canceled: {
    label: 'Cancelado',
    icon: Ban,
    variant: 'muted',
  },
  overdue: {
    label: 'Retrasado',
    icon: Clock,
    variant: 'warning',
  },
  lost: {
    label: 'Extraviado',
    icon: AlertTriangle,
    variant: 'danger',
  },
} as const

export type LoanStatus = keyof typeof statusIconsAndLabels
export type StatusIconMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
