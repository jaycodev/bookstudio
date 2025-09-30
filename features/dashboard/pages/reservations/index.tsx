import rawData from '@mocks/data/reservations.json'
import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

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
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="reservations"
        title={title}
        description="Organizadas, claras y accesibles."
      />
    </>
  )
}
