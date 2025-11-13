import { config } from '@/config'
import { ApiError, ApiResponse } from '@/lib/schemas/common/api-response.schema'

export class ApiClientError extends Error {
  constructor(
    public status: number,
    public path: string,
    message: string,
    public errors?: ApiError['errors']
  ) {
    super(message)
    this.name = 'ApiClientError'
  }

  static fromApiError(error: ApiError): ApiClientError {
    return new ApiClientError(error.status, error.path, error.message, error.errors)
  }
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = config.api.baseUrl) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      const text = await response.text()

      if (!text || text.trim() === '') {
        return [] as T
      }

      const data: ApiResponse<T> = JSON.parse(text)

      if (!data.success) {
        throw ApiClientError.fromApiError(data)
      }

      return data.data
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error
      }

      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  async post<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      })

      const data: ApiResponse<T> = await response.json()

      if (!data.success) {
        throw ApiClientError.fromApiError(data)
      }

      return data.data
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error
      }

      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  async put<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      })

      const data: ApiResponse<T> = await response.json()

      if (!data.success) {
        throw ApiClientError.fromApiError(data)
      }

      return data.data
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error
      }

      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      const data: ApiResponse<T> = await response.json()

      if (!data.success) {
        throw ApiClientError.fromApiError(data)
      }

      return data.data
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error
      }

      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }
}

export const apiClient = new ApiClient()
