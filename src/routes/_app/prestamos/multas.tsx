import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/prestamos/multas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Multas</div>
}
