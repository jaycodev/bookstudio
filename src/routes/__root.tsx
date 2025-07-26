import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import NavigationProgress from '@/components/feedback/navigation-progress'
import DocumentTitle from '@/components/shared/utils/document-title'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <NavigationProgress />
        <DocumentTitle />
        <Outlet />
      </>
    )
  },
})
