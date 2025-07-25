import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/users.json'
import { User } from './schema/user.schema.ts'
import { columns } from './table/columns.tsx'

const data: User[] = rawData.map((user) => ({
  ...user,
  Role: user.Role === 'administrador' ? 'administrador' : 'bibliotecario',
}))

const UsersPage = () => {
  return <DataTable columns={columns} data={data} resource="users" />
}

export default UsersPage
