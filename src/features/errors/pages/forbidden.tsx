import { ErrorLayout } from '../layout'

export function ForbiddenError() {
  return (
    <ErrorLayout
      status={403}
      title="Acceso denegado"
      message={
        <>
          No tienes los permisos necesarios <br />
          para ver esta página.
        </>
      }
    />
  )
}
