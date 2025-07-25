import {
  BookCopy,
  Building2,
  CircleFadingPlus,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  LogIn,
  Notebook,
  Settings,
  SquareUser,
  Users,
} from 'lucide-react'

type PageMeta = {
  title: string
  icon?: React.ElementType
  showInSidebar?: boolean
  authOnly?: boolean
}

export const pageMap: Record<string, PageMeta> = {
  '/': { title: 'Dashboard', icon: LayoutDashboard, showInSidebar: true, authOnly: true },
  '/prestamos': { title: 'Préstamos', icon: CircleFadingPlus, showInSidebar: true, authOnly: true },
  '/libros': { title: 'Libros', icon: BookCopy, showInSidebar: true, authOnly: true },
  '/autores': { title: 'Autores', icon: SquareUser, showInSidebar: true, authOnly: true },
  '/editoriales': { title: 'Editoriales', icon: Building2, showInSidebar: true, authOnly: true },
  '/cursos': { title: 'Cursos', icon: Notebook, showInSidebar: true, authOnly: true },
  '/estudiantes': {
    title: 'Estudiantes',
    icon: GraduationCap,
    showInSidebar: true,
    authOnly: true,
  },
  '/usuarios': { title: 'Usuarios', icon: Users, showInSidebar: true, authOnly: true },

  '/perfil': { title: 'Perfil', icon: Settings, authOnly: true },
  '/iniciar-sesion': { title: 'Iniciar sesión', icon: LogIn },
  '/recuperar-contraseña': { title: 'Recuperar contraseña', icon: KeyRound },
  '/restablecer-contraseña': { title: 'Restablecer contraseña', icon: KeyRound },
}
