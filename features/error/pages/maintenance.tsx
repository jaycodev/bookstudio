import { Info } from 'lucide-react'

import { Button } from '@components/ui/button'
import { ErrorLayout } from '@error/layout'

export function MaintenanceErrorPage() {
  return (
    <ErrorLayout
      status={503}
      title="Sitio en mantenimiento"
      message={
        <>
          El sitio no está disponible en este momento. <br />
          Volveremos en línea pronto.
        </>
      }
      actions={
        <Button variant="outline">
          <Info />
          Más información
        </Button>
      }
    />
  )
}
