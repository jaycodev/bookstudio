import { Breadcrumbs } from '@/features/dashboard/components/breadcrumbs'
import { DataTable } from '@/features/dashboard/components/data-table/data-table'

import rawData from './data/loans.json'
import { LoanList, loanListSchema } from './schema/list.schema'
import { columns } from './table/columns'

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
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="loans"
        title={title}
        description="Todo lo que necesitas para gestionarlos."
      />
    </>
  )
}
