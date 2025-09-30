import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

import rawData from './data/locations.json'
import { LocationList, locationListSchema } from './schema/list.schema'
import { columns } from './table/columns'

let data: LocationList[] = []

try {
  data = locationListSchema.array().parse(rawData)
} catch (error) {
  console.error(
    'Failed to parse location data. Please check the structure of your JSON file.',
    error
  )
  data = []
}

interface Props {
  title: string
}

export function LocationsPage({ title }: Props) {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="locations"
        title={title}
        description="Gestiona los espacios de tu biblioteca."
      />
    </>
  )
}
