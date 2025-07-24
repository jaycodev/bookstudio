import { DataTable } from '@/components/data-table/data-table'

import rawData from './loans.json'
import { columns } from './loans-columns'
import { Loan } from './schema'

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
