import axios from 'axios'
import { notification } from 'antd'

const apiBase = import.meta.env.VITE_API_BASE || '/api'
const catalogBase = import.meta.env.VITE_CATALOG_BASE || '/catalog'

export const api = axios.create({
  baseURL: apiBase,
  timeout: 15000,
})

export const catalogApi = axios.create({
  baseURL: catalogBase,
  timeout: 15000,
})

// Interceptors (exemplo: correlation, tenant)
function commonRequestInterceptor(config: any) {
  // Ex.: config.headers['X-Correlation-Id'] = crypto.randomUUID?.() || String(Date.now())
  // Ex.: config.headers['X-Tenant-Id'] = localStorage.getItem('tenantId') || ''
  config.headers = config.headers || {}
  if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json'
  const token = localStorage.getItem('accessToken')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
}

let isRefreshing = false
let pendingQueue: Array<(token: string | null) => void> = []

async function processQueue(token: string | null) {
  pendingQueue.forEach((cb) => cb(token))
  pendingQueue = []
}

function commonResponseError(error: any) {
  // Centralizar tratamento de erro (toast, logs, etc.)
  const msg = error?.response?.data?.message || error?.message || 'Erro de comunicação com o servidor'
  const originalRequest = error.config
  // tenta refresh uma única vez por request
  if (error?.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      notification.error({ message: 'Sessão expirada', description: 'Faça login novamente', duration: 3 })
      if (location.pathname !== '/login') location.href = '/login'
      return Promise.reject(error)
    }
    if (isRefreshing) {
      // fila: aguarda refresh em andamento
      return new Promise((resolve, reject) => {
        pendingQueue.push((token) => {
          if (token) {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            resolve(axios(originalRequest))
          } else {
            reject(error)
          }
        })
      })
    }
    isRefreshing = true
    return api
      .post('/auth/refresh', { refreshToken })
      .then((res) => {
        const newToken = res?.data?.accessToken as string | undefined
        if (newToken) {
          localStorage.setItem('accessToken', newToken)
          processQueue(newToken)
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return axios(originalRequest)
        }
        processQueue(null)
        throw error
      })
      .catch((err) => {
        processQueue(null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        notification.error({ message: 'Sessão expirada', description: 'Faça login novamente', duration: 3 })
        if (location.pathname !== '/login') location.href = '/login'
        return Promise.reject(err)
      })
      .finally(() => {
        isRefreshing = false
      })
  }
  notification.error({ message: 'Erro', description: String(msg), duration: 3 })
  return Promise.reject(error)
}

api.interceptors.request.use(commonRequestInterceptor)
api.interceptors.response.use((r) => r, commonResponseError)

catalogApi.interceptors.request.use(commonRequestInterceptor)
catalogApi.interceptors.response.use((r) => r, commonResponseError)
