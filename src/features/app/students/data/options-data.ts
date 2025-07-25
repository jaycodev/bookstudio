import { CheckCircle2, XCircle } from 'lucide-react'

import { FilterOption } from '@/types/types'

export const status: FilterOption[] = [
  { label: 'Activo', value: 'activo', icon: CheckCircle2 },
  { label: 'Inactivo', value: 'inactivo', icon: XCircle },
]
