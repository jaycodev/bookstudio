import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/trabajadores/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Trabajadores</div>
}
