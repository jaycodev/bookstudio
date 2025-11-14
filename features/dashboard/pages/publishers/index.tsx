import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { publishersApi } from '@/lib/api/publishers'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function PublishersPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Información siempre lista."
      pathname={pathname}
      skeletonConfig={{ columnCount: 7, filterCount: 2, dateRangeCount: 0 }}
    >
      <TableListContent
        columns={columns}
        resource="publishers"
        dataFetcher={publishersApi.getAll}
      />
    </TableListLayout>
  )
}
