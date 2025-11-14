import { type FineList, fineListSchema } from '@/lib/schemas/fine/fine.list.schema'

import { apiClient } from './client'

export const finesApi = {
  async getAll(): Promise<FineList[]> {
    const data = await apiClient.get('/fines')
    return fineListSchema.array().parse(data)
  },
}
