import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/roles/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Roles</div>
}
