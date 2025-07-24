import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/loans': 'Préstamos',
  '/books': 'Libros',
  '/authors': 'Autores',
  '/publishers': 'Editoriales',
  '/courses': 'Cursos',
  '/students': 'Estudiantes',
  '/users': 'Usuarios',
  '/profile': 'Perfil',
  '/login': 'Iniciar sesión',
  '/forgot-password': 'Recuperar contraseña',
  '/reset-password': 'Restablecer contraseña',
}

export default function DocumentTitle() {
  const location = useLocation()

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'BookStudio'
    document.title = `${title} - BookStudio`
  }, [location.pathname])

  return null
}
