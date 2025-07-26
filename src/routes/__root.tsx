import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import NavigationProgress from '@/components/feedback/navigation-progress'
import GeneralError from '@/features/errors/pages/general'
import NotFoundError from '@/features/errors/pages/not-found'
import DocumentTitle from '@/lib/document-title'

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
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
