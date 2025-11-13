import { TableListPage } from '@dashboard/components/shared/table-list-page'

import { loansApi } from '@/lib/api/loans'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
}

export async function LoansPage({ title, pathname }: Props) {
  const data = await loansApi.getAll()

  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="loans"
      title={title}
      description="Todo lo que necesitas para gestionarlos."
      pathname={pathname}
    />
  )
}
