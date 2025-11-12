import { TableListPage } from '@dashboard/components/shared/table-list-page'

import rawData from '@/mocks/data/loans.json'

import { columns } from './columns'
import { LoanList, loanListSchema } from './list.schema'

let data: LoanList[] = []

try {
  data = loanListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse loan data. Please check the structure of your JSON file.', error)
  data = []
}

interface Props {
  title: string
}

export function LoansPage({ title }: Props) {
  return (
    <TableListPage
      columns={columns}
      data={data}
      resource="loans"
      title={title}
      description="Todo lo que necesitas para gestionarlos."
    />
  )
}
