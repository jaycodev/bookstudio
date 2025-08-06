import { CheckCircle, Clock, type LucideIcon } from 'lucide-react'

export const statusIconsAndLabels = {
  pendiente: {
    label: 'Pendiente',
    icon: Clock,
    variant: 'warning',
  },
  pagado: {
    label: 'Pagado',
    icon: CheckCircle,
    variant: 'success',
  },
} as const

export type FineStatus = keyof typeof statusIconsAndLabels

export type FineStatusIconMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
