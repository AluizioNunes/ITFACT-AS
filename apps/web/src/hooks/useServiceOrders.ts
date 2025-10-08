import { useQuery } from '@tanstack/react-query'
import { api } from '../shared/api/http'

export type ServiceOrder = {
  id: string
  tenant_id: string
  number: string
  status: string
  total_amount: string
}

export function useServiceOrders(params?: { status?: string; q?: string }) {
  return useQuery({
    queryKey: ['service-orders', params],
    queryFn: async () => {
      const { data } = await api.get<ServiceOrder[]>('/service-orders', { params })
      return data
    },
  })
}
