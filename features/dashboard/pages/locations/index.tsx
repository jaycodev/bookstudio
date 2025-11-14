import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { locationsApi } from '@/lib/api/locations'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function LocationsPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Gestiona los espacios de tu biblioteca."
      pathname={pathname}
      skeletonConfig={{ columnCount: 7, filterCount: 0, dateRangeCount: 0 }}
    >
      <TableListContent columns={columns} resource="locations" dataFetcher={locationsApi.getAll} />
    </TableListLayout>
  )
}
