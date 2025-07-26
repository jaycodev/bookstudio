import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/prestamos/reservas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Reservas</div>
}
