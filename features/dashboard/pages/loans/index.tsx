import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { loansApi } from '@/lib/api/loans'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function LoansPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Todo lo que necesitas para gestionarlos."
      pathname={pathname}
      skeletonConfig={{ columnCount: 8, filterCount: 2, dateRangeCount: 1 }}
    >
      <TableListContent columns={columns} resource="loans" dataFetcher={loansApi.getAll} />
    </TableListLayout>
  )
}
