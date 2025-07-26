import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/centro-de-ayuda/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Centro de ayuda</div>
}
