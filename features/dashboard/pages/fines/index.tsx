import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { finesApi } from '@/lib/api/fines'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function FinesPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Control de sanciones."
      pathname={pathname}
      skeletonConfig={{ columnCount: 9, filterCount: 3, dateRangeCount: 1 }}
    >
      <TableListContent columns={columns} resource="fines" dataFetcher={finesApi.getAll} />
    </TableListLayout>
  )
}
