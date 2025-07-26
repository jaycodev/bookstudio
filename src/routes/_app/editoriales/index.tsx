import { createFileRoute } from '@tanstack/react-router'

import PublishersPage from '@/features/app/library/publishers'

export const Route = createFileRoute('/_app/editoriales/')({
  component: PublishersPage,
})
