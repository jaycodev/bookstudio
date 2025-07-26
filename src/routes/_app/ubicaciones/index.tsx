import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/ubicaciones/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Ubicaciones</div>
}
