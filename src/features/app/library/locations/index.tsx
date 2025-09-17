import { MapPin } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/locations.json'
import { LocationList, locationListSchema } from './schema/list.schema.ts'
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

export function LocationsPage() {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="locations"
        title="Ubicaciones"
        description="Gestiona los espacios de tu biblioteca."
        icon={MapPin}
      />
    </>
  )
}
