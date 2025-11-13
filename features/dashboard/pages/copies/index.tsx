import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { copiesApi } from '@/lib/api/copies'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function CopiesPage({ title, pathname }: Props) {
  const data = await copiesApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="copies"
      title={title}
      description="Controla tu inventario fácilmente."
      pathname={pathname}
    />
  )
}
