import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { workersApi } from '@/lib/api/workers'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function WorkersPage({ title, pathname }: Props) {
  const data = await workersApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="workers"
      title={title}
      description="Administra tu equipo."
      pathname={pathname}
    />
  )
}
