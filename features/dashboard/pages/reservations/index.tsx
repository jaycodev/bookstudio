import { TableListPage } from '@dashboard/components/table-list-page'

import rawData from '@/mocks/data/reservations.json'

import { columns } from './columns'
import { ReservationList, reservationListSchema } from './list.schema'

let data: ReservationList[] = []

try {
  data = reservationListSchema.array().parse(rawData)
} catch (error) {
  console.error(
    'Failed to parse reservation data. Please check the structure of your JSON file.',
    error
  )
  data = []
}

interface Props {
  title: string
}

export function ReservationsPage({ title }: Props) {
  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="reservations"
      title={title}
      description="Organizadas, claras y accesibles."
    />
  )
}
