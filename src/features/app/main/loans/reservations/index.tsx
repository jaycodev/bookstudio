import { Calendar1 } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/reservations.json'
import { ReservationList, reservationListSchema } from './schema/list.schema.ts'
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

const ReservationsPage = () => {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="reservations"
        title="Reservas"
        description="Organizadas, claras y accesibles."
        icon={Calendar1}
      />
    </>
  )
}

export default ReservationsPage
