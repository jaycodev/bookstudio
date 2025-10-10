import { Breadcrumbs } from '@dashboard/components/breadcrumbs'
import { DataTable } from '@dashboard/components/data-table'

import rawData from '@/mocks/data/roles.json'

import { columns } from './columns'
import { RoleList, roleListSchema } from './list.schema'

let data: RoleList[] = []

try {
  data = roleListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse role data. Please check the structure of your JSON file.', error)
  data = []
}

interface Props {
  title: string
}

export function RolesPage({ title }: Props) {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="roles"
        title={title}
        description="Define permisos fácilmente."
      />
    </>
  )
}
