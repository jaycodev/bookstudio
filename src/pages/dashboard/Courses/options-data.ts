import { FilterOption } from '@/types/types'
import { CheckCircle2, XCircle } from 'lucide-react'

export const levels: FilterOption[] = [
  { label: 'Principiante', value: 'Principiante' },
  { label: 'Intermedio', value: 'Intermedio' },
  { label: 'Avanzado', value: 'Avanzado' },
]

export const status: FilterOption[] = [
  { label: 'Activo', value: 'activo', icon: CheckCircle2 },
  { label: 'Inactivo', value: 'inactivo', icon: XCircle },
]
