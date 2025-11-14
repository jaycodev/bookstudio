import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { workersApi } from '@/lib/api/workers'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function WorkersPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Administra tu equipo."
      pathname={pathname}
      skeletonConfig={{ columnCount: 7, filterCount: 2, dateRangeCount: 0 }}
    >
      <TableListContent columns={columns} resource="workers" dataFetcher={workersApi.getAll} />
    </TableListLayout>
  )
}
