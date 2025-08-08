type PageMeta = {
  title: string
  documentTitle?: string
  authOnly?: boolean
  showInSidebar?: boolean
  parentItem?: ValidUrl
}

export const pageMap: Record<string, PageMeta> = {
  '/': { title: 'Dashboard', documentTitle: 'Dashboard', authOnly: true, showInSidebar: true },

  '/prestamos': {
    title: 'Todos',
    documentTitle: 'Préstamos',
    authOnly: true,
    showInSidebar: true,
  },
  '/prestamos/reservas': {
    title: 'Reservas',
    documentTitle: 'Préstamos',
    authOnly: true,
    showInSidebar: true,
  },
  '/prestamos/multas': {
    title: 'Multas',
    documentTitle: 'Préstamos',
    authOnly: true,
    showInSidebar: true,
  },
  '/prestamos/pagos': {
    title: 'Pagos',
    documentTitle: 'Préstamos',
    authOnly: true,
    showInSidebar: true,
  },

  '/libros': { title: 'Libros', documentTitle: 'Libros', authOnly: true, showInSidebar: true },
  '/ejemplares': {
    title: 'Ejemplares',
    documentTitle: 'Ejemplares',
    authOnly: true,
    showInSidebar: true,
  },
  '/autores': { title: 'Autores', documentTitle: 'Autores', authOnly: true, showInSidebar: true },
  '/editoriales': {
    title: 'Editoriales',
    documentTitle: 'Editoriales',
    authOnly: true,
    showInSidebar: true,
  },
  '/categorias': {
    title: 'Categorías',
    documentTitle: 'Categorías',
    authOnly: true,
    showInSidebar: true,
  },
  '/ubicaciones': {
    title: 'Ubicaciones',
    documentTitle: 'Ubicaciones',
    authOnly: true,
    showInSidebar: true,
  },

  '/lectores': {
    title: 'Lectores',
    documentTitle: 'Lectores',
    authOnly: true,
    showInSidebar: true,
  },
  '/trabajadores': {
    title: 'Trabajadores',
    documentTitle: 'Trabajadores',
    authOnly: true,
    showInSidebar: true,
  },
  '/roles': { title: 'Roles', documentTitle: 'Roles', authOnly: true, showInSidebar: true },

  '/ajustes': { title: 'Ajustes', documentTitle: 'Ajustes', authOnly: true, showInSidebar: true },
  '/ajustes/cuenta': {
    title: 'Cuenta',
    documentTitle: 'Ajustes',
    authOnly: true,
  },
  '/ajustes/apariencia': {
    title: 'Apariencia',
    documentTitle: 'Ajustes',
    authOnly: true,
  },
  '/ajustes/notificaciones': {
    title: 'Notificaciones',
    documentTitle: 'Ajustes',
    authOnly: true,
  },
  '/centro-de-ayuda': {
    title: 'Centro de ayuda',
    documentTitle: 'Centro de ayuda',
    authOnly: true,
    showInSidebar: true,
  },

  '/iniciar-sesion': { title: '', documentTitle: 'Iniciar sesión' },
  '/recuperar-contraseña': { title: '', documentTitle: 'Recuperar contraseña' },
  '/restablecer-contraseña': {
    title: '',
    documentTitle: 'Restablecer contraseña',
  },
} as const

export type ValidUrl = keyof typeof pageMap
