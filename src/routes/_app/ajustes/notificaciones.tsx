import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/ajustes/notificaciones')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Notificaciones</div>
}
