import { type AuthorList, authorListSchema } from '@/lib/schemas/author/author.list.schema'

import { apiClient } from './client'

export const authorsApi = {
  async getAll(): Promise<AuthorList[]> {
    const data = await apiClient.get('/authors', {
      cache: 'no-store',
    })
    return authorListSchema.array().parse(data)
  },
}
