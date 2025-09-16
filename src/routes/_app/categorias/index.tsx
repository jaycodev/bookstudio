import { createFileRoute } from '@tanstack/react-router'

import { CategoriesPage } from '@/features/app/library/categories'

export const Route = createFileRoute('/_app/categorias/')({
  component: CategoriesPage,
})
