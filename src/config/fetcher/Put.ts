import axios, { AxiosResponse } from 'axios'

interface PutResponse<T> extends AxiosResponse<T> {
  data: T
}

type PutFunction = <T>(
  url: string,
  body?: unknown,
  token?: string,
  headers?: Record<string, string>
) => Promise<PutResponse<T>>

export async function PUT<T>(
  url: string,
  body?: unknown,
  token?: string,
  headers: Record<string, string> = {}
): Promise<PutResponse<T>> {
  const response = await axios.put<T>(url, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...headers,
    },
  })

  return response as PutResponse<T>
}