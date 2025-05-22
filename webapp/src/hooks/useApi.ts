import { useState, useCallback } from 'react'
import { apiClient, ApiResponse } from '@/utils/api-client'

export function useApi<T, B = unknown>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = useCallback(async (
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
  }, [])

  const get = useCallback((endpoint: string) => request('get', endpoint), [request])
  const post = useCallback((endpoint: string, body?: B) => request('post', endpoint, body), [request])
  const put = useCallback((endpoint: string, body?: B) => request('put', endpoint, body), [request])
  const del = useCallback((endpoint: string) => request('delete', endpoint), [request])

  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del
  }
} 