import { Handshake } from 'lucide-react'

import { Breadcrumbs } from '@/features/app/components/breadcrumbs.tsx'
import { DataTable } from '@/features/app/components/data-table/data-table'

import rawData from './data/loans.json'
import { LoanList, loanListSchema } from './schema/loan.schema.ts'
import { columns } from './table/columns'

let data: LoanList[] = []

try {
  data = loanListSchema.array().parse(rawData)
} catch (error) {
  console.error('Failed to parse loan data. Please check the structure of your JSON file.', error)
  data = []
}

const LoansPage = () => {
  return (
    <>
      <Breadcrumbs />
      <DataTable
        columns={columns}
        data={data}
        resource="loans"
        title="Préstamos"
        description="Todo lo que necesitas para gestionarlos."
        icon={Handshake}
      />
    </>
  )
}

export default LoansPage
