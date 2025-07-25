import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/prestamos': 'Préstamos',
  '/libros': 'Libros',
  '/autores': 'Autores',
  '/editoriales': 'Editoriales',
  '/cursos': 'Cursos',
  '/estudiantes': 'Estudiantes',
  '/usuarios': 'Usuarios',
  '/perfil': 'Perfil',
  '/iniciar-sesión': 'Iniciar sesión',
  '/recuperar-contraseña': 'Recuperar contraseña',
  '/restablecer-contraseña': 'Restablecer contraseña',
}

export default function DocumentTitle() {
  const location = useLocation()

  useEffect(() => {
    const title = routeTitles[location.pathname] || ''
    document.title = `${title} - BookStudio`
  }, [location.pathname])

  return null
}
