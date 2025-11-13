import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { readersApi } from '@/lib/api/readers'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function ReadersPage({ title, pathname }: Props) {
  const data = await readersApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="readers"
      title={title}
      description="Seguimiento de miembros."
      pathname={pathname}
    />
  )
}
