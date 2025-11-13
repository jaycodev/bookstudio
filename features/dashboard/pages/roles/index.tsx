import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { rolesApi } from '@/lib/api/roles'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function RolesPage({ title, pathname }: Props) {
  const data = await rolesApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="roles"
      title={title}
      description="Define permisos fácilmente."
      pathname={pathname}
    />
  )
}
