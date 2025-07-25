import { DataTable } from '@/features/app/components/data-table/data-table.tsx'

import rawData from './data/loans.json'
import { Loan } from './schema/loan.schema.ts'
import { columns } from './table/columns.tsx'

const data: Loan[] = rawData.map((loan) => ({
  ...loan,
  Status: loan.Status === 'devuelto' ? 'devuelto' : 'prestado',
  LoanDate: new Date(loan.LoanDate),
  ReturnDate: new Date(loan.ReturnDate),
}))

const LoansPage = () => {
  return <DataTable columns={columns} data={data} resource="loans" />
}

export default LoansPage
