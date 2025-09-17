import { ShieldCheck } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/roles.json'
import { RoleList, roleListSchema } from './schema/list.schema.ts'
import { columns } from './table/columns.tsx'

let data: RoleList[] = []

try {
  data = roleListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse role data. Please check the structure of your JSON file.', error)
  data = []
}

export function RolesPage() {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="roles"
        title="Roles"
        description="Define permisos fácilmente."
        icon={ShieldCheck}
      />
    </>
  )
}
