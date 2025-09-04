import {
  AlertTriangle,
  BadgeCheck,
  Ban,
  type LucideIcon,
  MinusCircle,
  ThumbsUp,
} from 'lucide-react'

export const conditionBadges = {
  NUEVO: {
    label: 'Nuevo',
    icon: BadgeCheck,
    variant: 'brand',
  },
  BUENO: {
    label: 'Bueno',
    icon: ThumbsUp,
    variant: 'bright',
  },
  REGULAR: {
    label: 'Regular',
    icon: MinusCircle,
    variant: 'muted',
  },
  MALO: {
    label: 'Malo',
    icon: AlertTriangle,
    variant: 'warning',
  },
  DETERIORADO: {
    label: 'Deteriorado',
    icon: Ban,
    variant: 'danger',
  },
} as const

export type Condition = keyof typeof conditionBadges

export type ConditionBadgeMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
