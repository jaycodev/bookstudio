import { CheckCircle2, XCircle } from 'lucide-react'

import { FilterOption } from '@/types/types'

export const nationalities: FilterOption[] = [
  { label: 'Colombiana', value: 'Colombiana' },
  { label: 'Chilena', value: 'Chilena' },
  { label: 'Argentina', value: 'Argentina' },
  { label: 'Peruana', value: 'Peruana' },
  { label: 'Mexicana', value: 'Mexicana' },
  { label: 'Nicaragüense', value: 'Nicaragüense' },
  { label: 'Española', value: 'Española' },
  { label: 'Uruguaya', value: 'Uruguaya' },
  { label: 'Cubana', value: 'Cubana' },
]

export const literaryGenres: FilterOption[] = [
  { label: 'Realismo mágico', value: 'Realismo mágico' },
  { label: 'Narrativa histórica', value: 'Narrativa histórica' },
  { label: 'Ficción filosófica', value: 'Ficción filosófica' },
  { label: 'Realismo', value: 'Realismo' },
]

export const status: FilterOption[] = [
  { label: 'Activo', value: 'activo', icon: CheckCircle2 },
  { label: 'Inactivo', value: 'inactivo', icon: XCircle },
]
