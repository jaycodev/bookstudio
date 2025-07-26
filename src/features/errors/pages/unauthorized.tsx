import ErrorLayout from '../layout'

export default function MaintenanceError() {
  return (
    <ErrorLayout
      status={401}
      title="Acceso no autorizado"
      message={
        <>
          Por favor, inicia sesión con las credenciales adecuadas <br />
          para acceder a este recurso.
        </>
      }
    />
  )
}
