import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

import rawData from './data/reservations.json'
import { ReservationList, reservationListSchema } from './schema/list.schema'
import { columns } from './table/columns'

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
