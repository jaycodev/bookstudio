import type { Metadata } from 'next'

import { CategoriesPage } from '@dashboard/pages/categories'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/categorias'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <CategoriesPage title={page.title} pathname={PATHNAME} />
}
