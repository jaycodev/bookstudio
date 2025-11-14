type PageMeta = {
  title: string
  authOnly?: boolean
  showInSidebar?: boolean
  resource?: string
}

export const pageMap: Record<string, PageMeta> = {
  '/': { title: 'Dashboard', authOnly: true, showInSidebar: true },

  '/prestamos': { title: 'Préstamos', authOnly: true, showInSidebar: true, resource: 'loans' },
  '/reservas': { title: 'Reservas', authOnly: true, showInSidebar: true, resource: 'reservations' },
  '/multas': { title: 'Multas', authOnly: true, showInSidebar: true, resource: 'fines' },
  '/pagos': { title: 'Pagos', authOnly: true, showInSidebar: true, resource: 'payments' },

  '/libros': { title: 'Libros', authOnly: true, showInSidebar: true, resource: 'books' },
  '/ejemplares': { title: 'Ejemplares', authOnly: true, showInSidebar: true, resource: 'copies' },
  '/autores': { title: 'Autores', authOnly: true, showInSidebar: true, resource: 'authors' },
  '/editoriales': {
    title: 'Editoriales',
    authOnly: true,
    showInSidebar: true,
    resource: 'publishers',
  },
  '/categorias': {
    title: 'Categorías',
    authOnly: true,
    showInSidebar: true,
    resource: 'categories',
  },
  '/ubicaciones': {
    title: 'Ubicaciones',
    authOnly: true,
    showInSidebar: true,
    resource: 'locations',
  },

  '/lectores': { title: 'Lectores', authOnly: true, showInSidebar: true, resource: 'readers' },
  '/trabajadores': {
    title: 'Trabajadores',
    authOnly: true,
    showInSidebar: true,
    resource: 'workers',
  },
  '/roles': { title: 'Roles', authOnly: true, showInSidebar: true, resource: 'roles' },

  '/ajustes': { title: 'Ajustes', authOnly: true, showInSidebar: true },
  '/ajustes/cuenta': { title: 'Cuenta', authOnly: true },
  '/ajustes/apariencia': { title: 'Apariencia', authOnly: true },
  '/ajustes/notificaciones': { title: 'Notificaciones', authOnly: true },
  '/ajustes/visualizacion': { title: 'Visualización', authOnly: true },

  '/centro-de-ayuda': { title: 'Centro de ayuda', authOnly: true, showInSidebar: true },

  '/iniciar-sesion': { title: 'Iniciar sesión' },
  '/recuperar-contrasena': { title: 'Recuperar contraseña' },
  '/restablecer-contrasena': { title: 'Restablecer contraseña' },

  '/error/401': { title: 'Acceso no autorizado' },
  '/error/403': { title: 'Acceso denegado' },
  '/error/404': { title: 'Página no encontrada' },
  '/error/500': { title: 'Algo salió mal' },
  '/error/503': { title: 'Sitio en mantenimiento' },
} as const

export type ValidUrl = keyof typeof pageMap
