import { useState } from 'react'
import { apiClient, ApiResponse } from '@/utils/api-client'

export function useApi<T, B = unknown>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = async (
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    body?: B
  ): Promise<ApiResponse<T>> => {
    setLoading(true)
    setError(null)
    try {
      const response = await (method === 'get' || method === 'delete'
        ? apiClient[method]<T>(endpoint)
        : apiClient[method]<T>(endpoint, body))
      if (response.error) {
        setError(response.error)
      }
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return { error: errorMessage, status: 500 }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    get: (endpoint: string) => request('get', endpoint),
    post: (endpoint: string, body?: B) => request('post', endpoint, body),
    put: (endpoint: string, body?: B) => request('put', endpoint, body),
    delete: (endpoint: string) => request('delete', endpoint),
  }
} 