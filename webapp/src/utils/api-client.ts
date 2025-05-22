import supabase from './supabase/client'

export type ApiResponse<T = unknown> = {
  data?: T
  error?: string
  status: number
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = '/api'
  }

  private async getAuthHeader(): Promise<HeadersInit> {
    const { data: { session } } = await supabase.auth.getSession()
    return {
      'Content-Type': 'application/json',
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {})
    }
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getAuthHeader()
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          error: data.error || 'An error occurred',
          status: response.status
        }
      }

      return {
        data,
        status: response.status
      }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'An error occurred',
        status: 500
      }
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T, B = unknown>(endpoint: string, body?: B, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async put<T, B = unknown>(endpoint: string, body?: B, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient() 