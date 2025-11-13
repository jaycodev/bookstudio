import { type WorkerList, workerListSchema } from '@/lib/schemas/worker/worker.list.schema'

import { apiClient } from './client'

export const workersApi = {
  async getAll(): Promise<WorkerList[]> {
    const data = await apiClient.get('/workers', {
      cache: 'no-store',
    })
    return workerListSchema.array().parse(data)
  },
}
