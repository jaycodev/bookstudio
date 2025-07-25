import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import DocumentTitle from '@/components/shared/utils/document-title'
import NavigationProgress from '@/components/shared/feedback/navigation-progress'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <NavigationProgress />
        <DocumentTitle />
        <Outlet />
        {import.meta.env.MODE === 'development' && (
          <>
            <ReactQueryDevtools buttonPosition="bottom-right" />
            <TanStackRouterDevtools position="bottom-right" />
          </>
        )}
      </>
    )
  },
})
