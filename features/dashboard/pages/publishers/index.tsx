import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { publishersApi } from '@/lib/api/publishers'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function PublishersPage({ title, pathname }: Props) {
  const data = await publishersApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="publishers"
      title={title}
      description="Información siempre lista."
      pathname={pathname}
    />
  )
}
