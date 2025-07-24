import { DataTable } from '@/components/data-table/data-table'

import { User } from './schema'
import rawData from './users.json'
import { columns } from './users-columns'

const data: User[] = rawData.map((user) => ({
  ...user,
  Role: user.Role === 'administrador' ? 'administrador' : 'bibliotecario',
}))

const UsersPage = () => {
  return <DataTable columns={columns} data={data} resource="users" />
}

export default UsersPage
