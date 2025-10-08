import { useQuery } from '@tanstack/react-query'
import { api } from '../shared/api/http'

export type Product = {
  id: string
  tenant_id: string
  sku: string
  name: string
  unit?: string
  is_active: boolean
}

export function useProducts(params?: { q?: string }) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/products', { params })
      return data
    },
  })
}
