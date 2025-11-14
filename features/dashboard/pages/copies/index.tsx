import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { copiesApi } from '@/lib/api/copies'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function CopiesPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Controla tu inventario fácilmente."
      pathname={pathname}
      skeletonConfig={{ columnCount: 9, filterCount: 3, dateRangeCount: 0 }}
    >
      <TableListContent columns={columns} resource="copies" dataFetcher={copiesApi.getAll} />
    </TableListLayout>
  )
}
