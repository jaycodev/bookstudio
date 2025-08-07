import {
  AlertTriangle,
  Ban,
  CheckCircle,
  type LucideIcon,
  MinusCircle,
  ThumbsUp,
} from 'lucide-react'

export const conditionIconsAndLabels = {
  nuevo: {
    label: 'Nuevo',
    icon: CheckCircle,
    variant: 'success',
  },
  bueno: {
    label: 'Bueno',
    icon: ThumbsUp,
    variant: 'info',
  },
  regular: {
    label: 'Regular',
    icon: MinusCircle,
    variant: 'muted',
  },
  malo: {
    label: 'Malo',
    icon: AlertTriangle,
    variant: 'warning',
  },
  deteriorado: {
    label: 'Deteriorado',
    icon: Ban,
    variant: 'danger',
  },
} as const

export type CopyCondition = keyof typeof conditionIconsAndLabels

export type CopyConditionIconMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
