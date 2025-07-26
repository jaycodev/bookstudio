import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/prestamos/devueltos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Devueltos</div>
}
