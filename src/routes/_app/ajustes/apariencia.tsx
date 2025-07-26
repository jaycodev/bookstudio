import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/ajustes/apariencia')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Apariencia</div>
}
