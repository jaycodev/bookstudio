// src/routes/__root.tsx
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import DocumentTitle from '@/components/DocumentTitle'
import NavigationProgress from '@/components/navigation-progress'

export const rootRoute = createRootRouteWithContext<{}>()({
  component: () => (
    <>
      <NavigationProgress />
      <DocumentTitle />
      <Outlet />
    </>
  ),
})
