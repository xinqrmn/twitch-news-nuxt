import axios, { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api'

let axiosInstance: AxiosInstance | null = null
let onUnauthorized: (() => void) | null = null

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
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const status = error.response?.status
      if (status === 401) {
        if (onUnauthorized) onUnauthorized()
      }
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
  return { code, message, status }
}

export async function requestHandler<T = unknown>(config: AxiosRequestConfig): Promise<ApiResult<T>> {
  const client = getClient()
  try {
    const response = await client.request<T>(config)
    return { data: response.data }
  } catch (e) {
    return { error: toApiError(e) }
  }
}

export const api = {
  get: <T = unknown>(url: string, config: AxiosRequestConfig = {}) =>
    requestHandler<T>({ ...config, url, method: 'GET' }),
  post: <T = unknown>(url: string, data?: unknown, config: AxiosRequestConfig = {}) =>
    requestHandler<T>({ ...config, url, data, method: 'POST' }),
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
