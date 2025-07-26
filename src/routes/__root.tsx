import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import NavigationProgress from '@/components/feedback/navigation-progress'
import DocumentTitle from '@/components/shared/utils/document-title'
import GeneralError from '@/features/errors/pages/general'
import NotFoundError from '@/features/errors/pages/not-found'

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
