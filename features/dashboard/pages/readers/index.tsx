import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { readersApi } from '@/lib/api/readers'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function ReadersPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Seguimiento de miembros."
      pathname={pathname}
      skeletonConfig={{ columnCount: 8, filterCount: 2, dateRangeCount: 0 }}
    >
      <TableListContent columns={columns} resource="readers" dataFetcher={readersApi.getAll} />
    </TableListLayout>
  )
}
