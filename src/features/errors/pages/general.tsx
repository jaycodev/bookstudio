import ErrorLayout from '../layout'

export default function ForbiddenError() {
  return (
    <ErrorLayout
      status={500}
      title="¡Ups! Algo salió mal :')"
      message={
        <>
          Lamentamos el inconveniente. <br />
          Intenta nuevamente más tarde.
        </>
      }
    />
  )
}
