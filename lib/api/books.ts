import { type BookList, bookListSchema } from '@/lib/schemas/book/book.list.schema'

import { apiClient } from './client'

export const booksApi = {
  async getAll(): Promise<BookList[]> {
    const data = await apiClient.get('/books')
    return bookListSchema.array().parse(data)
  },
}
