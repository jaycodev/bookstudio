import { Ban, CheckCircle, type LucideIcon, Trash2 } from 'lucide-react'

export const statusIconsAndLabels = {
  activo: {
    label: 'Activo',
    icon: CheckCircle,
    variant: 'success',
  },
  suspendido: {
    label: 'Suspendido',
    icon: Ban,
    variant: 'muted',
  },
  eliminado: {
    label: 'Eliminado',
    icon: Trash2,
    variant: 'danger',
  },
} as const

export type AuthorStatus = keyof typeof statusIconsAndLabels

export type AuthorStatusIconMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
