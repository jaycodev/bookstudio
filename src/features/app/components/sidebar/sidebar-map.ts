import {
  ArchiveRestore,
  BookCopy,
  BookOpenText,
  Boxes,
  Briefcase,
  Building2,
  Calendar1,
  CircleQuestionMark,
  DollarSign,
  LayoutDashboard,
  MapPin,
  OctagonAlert,
  Settings,
  ShieldCheck,
  SquareUser,
  Tags,
  TimerReset,
} from 'lucide-react'

import { pageMap, type ValidUrl } from '@/config/page-map.ts'

type SidebarVisualMeta = {
  icon: React.ElementType
  group: 'principal' | 'biblioteca' | 'usuarios' | 'otros'
  parentItem?: 'prestamos'
}

export const sidebarMap: Partial<Record<ValidUrl, SidebarVisualMeta>> = {}

const setSidebar = <T extends ValidUrl>(url: T, meta: SidebarVisualMeta) => {
  if (pageMap[url].showInSidebar) {
    sidebarMap[url] = meta
  }
}

// Principal
setSidebar('/', {
  icon: LayoutDashboard,
  group: 'principal',
})

setSidebar('/prestamos/en-curso', {
  icon: TimerReset,
  group: 'principal',
  parentItem: 'prestamos',
})
setSidebar('/prestamos/devueltos', {
  icon: ArchiveRestore,
  group: 'principal',
  parentItem: 'prestamos',
})
setSidebar('/prestamos/reservas', {
  icon: Calendar1,
  group: 'principal',
  parentItem: 'prestamos',
})
setSidebar('/prestamos/multas', {
  icon: OctagonAlert,
  group: 'principal',
  parentItem: 'prestamos',
})
setSidebar('/prestamos/pagos', {
  icon: DollarSign,
  group: 'principal',
  parentItem: 'prestamos',
})

// Biblioteca
setSidebar('/ejemplares', { icon: Boxes, group: 'biblioteca' })
setSidebar('/libros', { icon: BookCopy, group: 'biblioteca' })
setSidebar('/autores', { icon: SquareUser, group: 'biblioteca' })
setSidebar('/editoriales', { icon: Building2, group: 'biblioteca' })
setSidebar('/categorias', { icon: Tags, group: 'biblioteca' })
setSidebar('/ubicaciones', { icon: MapPin, group: 'biblioteca' })

// Usuarios
setSidebar('/lectores', { icon: BookOpenText, group: 'usuarios' })
setSidebar('/trabajadores', { icon: Briefcase, group: 'usuarios' })
setSidebar('/roles', { icon: ShieldCheck, group: 'usuarios' })

// Ajustes
setSidebar('/ajustes', {
  icon: Settings,
  group: 'otros',
})

setSidebar('/centro-de-ayuda', {
  icon: CircleQuestionMark,
  group: 'otros',
})
