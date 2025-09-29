import {
  CircleQuestionMark,
  GraduationCap,
  type LucideIcon,
  PencilRuler,
  UserCog,
} from 'lucide-react'

export const typeBadges = {
  ESTUDIANTE: {
    label: 'Estudiante',
    icon: GraduationCap,
    variant: 'bright',
  },
  DOCENTE: {
    label: 'Docente',
    icon: PencilRuler,
    variant: 'brand',
  },
  ADMINISTRATIVO: {
    label: 'Administrativo',
    icon: UserCog,
    variant: 'info',
  },
  EXTERNO: {
    label: 'Externo',
    icon: CircleQuestionMark,
    variant: 'muted',
  },
} as const

export type Type = keyof typeof typeBadges

export type TypeBadgeMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
