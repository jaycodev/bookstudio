import {
  type PublisherList,
  publisherListSchema,
} from '@/lib/schemas/publisher/publisher.list.schema'

import { apiClient } from './client'

export const publishersApi = {
  async getAll(): Promise<PublisherList[]> {
    const data = await apiClient.get('/publishers', {
      cache: 'no-store',
    })
    return publisherListSchema.array().parse(data)
  },
}
