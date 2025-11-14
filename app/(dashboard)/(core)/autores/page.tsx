import type { Metadata } from 'next'

import { AuthorsPage } from '@dashboard/pages/authors'

import { pageMap } from '@/config/page-map'

const PATHNAME = '/autores'
const RESOURCE = 'authors'
const page = pageMap[PATHNAME]

export const metadata: Metadata = {
  title: page.title,
}

export default function Page() {
  return <AuthorsPage title={page.title} pathname={PATHNAME} resource={RESOURCE} />
}
