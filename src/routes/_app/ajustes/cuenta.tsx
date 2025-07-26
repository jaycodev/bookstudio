import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/ajustes/cuenta')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Cuenta</div>
}
