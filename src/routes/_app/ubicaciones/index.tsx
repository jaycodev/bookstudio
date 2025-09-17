import { createFileRoute } from '@tanstack/react-router'

import { LocationsPage } from '@/features/app/library/locations'

export const Route = createFileRoute('/_app/ubicaciones/')({
  component: LocationsPage,
})
