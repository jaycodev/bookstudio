import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { rolesApi } from '@/lib/api/roles'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function RolesPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Define permisos fácilmente."
      pathname={pathname}
      skeletonConfig={{ columnCount: 5, filterCount: 0, dateRangeCount: 0 }}
    >
      <TableListContent columns={columns} resource="roles" dataFetcher={rolesApi.getAll} />
    </TableListLayout>
  )
}
