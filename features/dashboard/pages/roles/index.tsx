import { Breadcrumbs } from '@/features/dashboard/components/breadcrumbs'
import { DataTable } from '@/features/dashboard/components/data-table/data-table'

import rawData from './data/roles.json'
import { RoleList, roleListSchema } from './schema/list.schema'
import { columns } from './table/columns'

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
