import { type CopyList, copyListSchema } from '@/lib/schemas/copy/copy.list.schema'

import { apiClient } from './client'

export const copiesApi = {
  async getAll(): Promise<CopyList[]> {
    const data = await apiClient.get('/copies')
    return copyListSchema.array().parse(data)
  },
}
