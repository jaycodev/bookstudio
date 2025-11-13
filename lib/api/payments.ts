import { type PaymentList, paymentListSchema } from '@/lib/schemas/payment/payment.list.schema'

import { apiClient } from './client'

export const paymentsApi = {
  async getAll(): Promise<PaymentList[]> {
    const data = await apiClient.get('/payments', {
      cache: 'no-store',
    })
    return paymentListSchema.array().parse(data)
  },
}
