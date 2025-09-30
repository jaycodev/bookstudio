import {
  BookCopy,
  BookOpenText,
  Boxes,
  Briefcase,
  Building2,
  Calendar1,
  CircleQuestionMark,
  DollarSign,
  Handshake,
  LayoutDashboard,
  MapPin,
  OctagonAlert,
  Settings,
  ShieldCheck,
  Tags,
  Users,
} from 'lucide-react'

import { pageMap, type ValidUrl } from '@config/page-map'

type SidebarVisualMeta = {
  icon: React.ElementType
  group: 'principal' | 'biblioteca' | 'usuarios' | 'otros'
}

export const sidebarMap: Partial<Record<ValidUrl, SidebarVisualMeta>> = {}

const setSidebar = <T extends ValidUrl>(url: T, meta: SidebarVisualMeta) => {
  if (pageMap[url].showInSidebar) {
    sidebarMap[url] = meta
  }
}

setSidebar('/', { icon: LayoutDashboard, group: 'principal' })
setSidebar('/prestamos', { icon: Handshake, group: 'principal' })
setSidebar('/reservas', { icon: Calendar1, group: 'principal' })
setSidebar('/multas', { icon: OctagonAlert, group: 'principal' })
setSidebar('/pagos', { icon: DollarSign, group: 'principal' })

setSidebar('/ejemplares', { icon: Boxes, group: 'biblioteca' })
setSidebar('/libros', { icon: BookCopy, group: 'biblioteca' })
setSidebar('/autores', { icon: Users, group: 'biblioteca' })
setSidebar('/editoriales', { icon: Building2, group: 'biblioteca' })
setSidebar('/categorias', { icon: Tags, group: 'biblioteca' })
setSidebar('/ubicaciones', { icon: MapPin, group: 'biblioteca' })

setSidebar('/lectores', { icon: BookOpenText, group: 'usuarios' })
setSidebar('/trabajadores', { icon: Briefcase, group: 'usuarios' })
setSidebar('/roles', { icon: ShieldCheck, group: 'usuarios' })

setSidebar('/ajustes', { icon: Settings, group: 'otros' })
setSidebar('/centro-de-ayuda', { icon: CircleQuestionMark, group: 'otros' })
