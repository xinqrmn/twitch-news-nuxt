import axios, { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '../router'
import type { Pagination } from '../types/pagination'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api'

let axiosInstance: AxiosInstance | null = null
const onUnauthorized: (() => void) | null = null

function createClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
    timeout: 30000,
  })

  instance.interceptors.request.use((config) => config)

  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error: AxiosError) => {
      if (error.response?.status === 401) router.push('/login')
      return Promise.reject(error)
    }
  )

  return instance
}

function getClient(): AxiosInstance {
  if (!axiosInstance) axiosInstance = createClient()
  return axiosInstance
}

export type ApiError = { code: string; message: string; status?: number }
export type ApiResult<T> = { data?: T; error?: ApiError }

function toApiError(e: unknown): ApiError {
  const err = e as AxiosError<any>
  const status = err.response?.status
  const code = (err.code ?? 'UNKNOWN').toString()
  const serverMessage =
    (typeof err.response?.data === 'string' && err.response?.data) ||
    (err.response?.data && (err.response.data.message || err.response.data.error)) ||
    undefined
  const message = serverMessage || err.message || 'Request failed'
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('api-error', {
        detail: { message, status, code },
      })
    )
  }

  return { code, message, status }
}

export type PaginationParams = {
  limit?: number
  currentPage?: number
  sortBy?: [string, 'ASC' | 'DESC'][]
  filter?: Record<string, any>
  search?: string
}

function appendPaginationParamsToConfig(
  config: AxiosRequestConfig,
  pagination?: PaginationParams
): AxiosRequestConfig {
  if (!pagination) return config

  const params = { ...(config.params || {}) }

  if (pagination.limit !== undefined) params.limit = pagination.limit
  if (pagination.currentPage !== undefined) params.page = pagination.currentPage
  if (pagination.sortBy && pagination.sortBy.length > 0) {
    params.sortBy = pagination.sortBy.map((sortItem) => `${sortItem[0]}:${sortItem[1]}`).join(',')
  }
  if (pagination.search !== undefined) params.search = pagination.search

  return { ...config, params }
}

export async function requestHandler<T = unknown>(
  config: AxiosRequestConfig,
  pagination?: PaginationParams
): Promise<ApiResult<T>> {
  const client = getClient()
  try {
    const finalConfig = appendPaginationParamsToConfig(config, pagination)
    const response = await client.request<T>(finalConfig)
    return { data: response.data }
  } catch (e) {
    return { error: toApiError(e) }
  }
}

export const api = {
  get: <T = unknown>(url: string, pagination?: PaginationParams, config: AxiosRequestConfig = {}) =>
    requestHandler<T>({ ...config, url, method: 'GET' }, pagination),
  post: <T = unknown>(
    url: string,
    data?: unknown,
    pagination?: PaginationParams,
    config: AxiosRequestConfig = {}
  ) => requestHandler<T>({ ...config, url, data, method: 'POST' }, pagination),
  put: <T = unknown>(url: string, data?: unknown, config: AxiosRequestConfig = {}) =>
    requestHandler<T>({ ...config, url, data, method: 'PUT' }),
  patch: <T = unknown>(url: string, data?: unknown, config: AxiosRequestConfig = {}) =>
    requestHandler<T>({ ...config, url, data, method: 'PATCH' }),
  delete: <T = unknown>(url: string, config: AxiosRequestConfig = {}) =>
    requestHandler<T>({ ...config, url, method: 'DELETE' }),
}

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}
