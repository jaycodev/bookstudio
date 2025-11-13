import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { locationsApi } from '@/lib/api/locations'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function LocationsPage({ title, pathname }: Props) {
  const data = await locationsApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="locations"
      title={title}
      description="Gestiona los espacios de tu biblioteca."
      pathname={pathname}
    />
  )
}
