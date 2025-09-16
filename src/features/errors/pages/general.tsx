import { ErrorLayout } from '../layout'

export function GeneralError() {
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
