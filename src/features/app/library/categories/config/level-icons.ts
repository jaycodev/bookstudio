import { Backpack, GraduationCap, Layers, type LucideIcon, NotebookText } from 'lucide-react'

export const levelIconsAndLabels = {
  primaria: {
    label: 'Primaria',
    icon: Backpack,
    variant: 'warning',
  },
  secundaria: {
    label: 'Secundaria',
    icon: NotebookText,
    variant: 'info',
  },
  superior: {
    label: 'Superior',
    icon: GraduationCap,
    variant: 'brand',
  },
  general: {
    label: 'General',
    icon: Layers,
    variant: 'muted',
  },
} as const

export type CategoryLevel = keyof typeof levelIconsAndLabels

export type CategoryLevelIconMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
