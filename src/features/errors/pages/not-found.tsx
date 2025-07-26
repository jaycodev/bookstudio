import ErrorLayout from '../layout'

export default function ForbiddenError() {
  return (
    <ErrorLayout
      status={404}
      title="¡Ups! Página no encontrada"
      message={
        <>
          Parece que la página que buscas <br />
          no existe o ha sido eliminada.
        </>
      }
    />
  )
}
