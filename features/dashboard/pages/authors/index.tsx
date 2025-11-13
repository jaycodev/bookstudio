import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { authorsApi } from '@/lib/api/authors'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function AuthorsPage({ title, pathname }: Props) {
  const data = await authorsApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="authors"
      title={title}
      description="Rápidos, claros y ordenados."
      pathname={pathname}
    />
  )
}
