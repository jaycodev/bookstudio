import { TableListContent } from '@dashboard/components/shared/table-list-content'
import { TableListLayout } from '@dashboard/components/shared/table-list-layout'

import { authorsApi } from '@/lib/api/authors'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function AuthorsPage({ title, pathname }: Props) {
  return (
    <TableListLayout
      title={title}
      description="Gestiona los autores de la plataforma"
      pathname={pathname}
      skeletonConfig={{ columnCount: 6, filterCount: 2, dateRangeCount: 1 }}
    >
      <TableListContent columns={columns} resource="authors" dataFetcher={authorsApi.getAll} />
    </TableListLayout>
  )
}
