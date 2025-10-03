import type { Metadata } from 'next'

import { pageMap } from '@config/page-map'
import { CategoriesPage } from '@dashboard/pages/categories'

const page = pageMap['/categorias']

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <CategoriesPage title={page.title} />
}
