import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { finesApi } from '@/lib/api/fines'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function FinesPage({ title, pathname }: Props) {
  const data = await finesApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="fines"
      title={title}
      description="Control de sanciones."
      pathname={pathname}
    />
  )
}
