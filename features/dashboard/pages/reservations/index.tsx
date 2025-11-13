import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { reservationsApi } from '@/lib/api/reservations'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function ReservationsPage({ title, pathname }: Props) {
  const data = await reservationsApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="reservations"
      title={title}
      description="Organizadas, claras y accesibles."
      pathname={pathname}
    />
  )
}
