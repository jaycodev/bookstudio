import { type LoanList, loanListSchema } from '@/lib/schemas/loan/loan.list.schema'

import { apiClient } from './client'

export const loansApi = {
  async getAll(): Promise<LoanList[]> {
    const data = await apiClient.get('/loans', {
      cache: 'no-store',
    })
    return loanListSchema.array().parse(data)
  },
}
