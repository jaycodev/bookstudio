import { BookUser, ShieldUser } from 'lucide-react'

import { FilterOption } from '@/types/types'

export const roles: FilterOption[] = [
  { label: 'Administrador', value: 'administrador', icon: ShieldUser },
  { label: 'Bibliotecario', value: 'bibliotecario', icon: BookUser },
]
