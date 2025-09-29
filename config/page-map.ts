type PageMeta = {
  title: string
  authOnly?: boolean
  showInSidebar?: boolean
  parentItem?: ValidUrl
}

export const pageMap: Record<string, PageMeta> = {
  '/': { title: 'Dashboard', authOnly: true, showInSidebar: true },

  '/prestamos': { title: 'Préstamos', authOnly: true, showInSidebar: true },
  '/reservas': { title: 'Reservas', authOnly: true, showInSidebar: true },
  '/multas': { title: 'Multas', authOnly: true, showInSidebar: true },
  '/pagos': { title: 'Pagos', authOnly: true, showInSidebar: true },

  '/libros': { title: 'Libros', authOnly: true, showInSidebar: true },
  '/ejemplares': { title: 'Ejemplares', authOnly: true, showInSidebar: true },
  '/autores': { title: 'Autores', authOnly: true, showInSidebar: true },
  '/editoriales': { title: 'Editoriales', authOnly: true, showInSidebar: true },
  '/categorias': { title: 'Categorías', authOnly: true, showInSidebar: true },
  '/ubicaciones': { title: 'Ubicaciones', authOnly: true, showInSidebar: true },

  '/lectores': { title: 'Lectores', authOnly: true, showInSidebar: true },
  '/trabajadores': { title: 'Trabajadores', authOnly: true, showInSidebar: true },
  '/roles': { title: 'Roles', authOnly: true, showInSidebar: true },

  '/ajustes': { title: 'Ajustes', authOnly: true, showInSidebar: true },
  '/ajustes/cuenta': { title: 'Cuenta', authOnly: true },
  '/ajustes/apariencia': { title: 'Apariencia', authOnly: true },
  '/ajustes/notificaciones': { title: 'Notificaciones', authOnly: true },
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
