import axios, { AxiosResponse } from 'axios'
import { store } from '@config/store'

interface PostResponse<T> extends AxiosResponse<T> { data: T }
type PostFunction = <T>(
  url: string,
  body?: unknown,
  token?: string,
  headers?: Record<string, string>
) => Promise<PostResponse<T>>

export const POST: PostFunction = async <T>(
  url, body, token, headers = {}
) => {
  const authToken = token || store.getState().user.token

  const payload = (
    body != null
    && typeof body === 'object'
    && 'body' in (body as Record<string, unknown>)
  )
    ? (body as Record<string, unknown>).body
    : body

  const response = await axios.post<T>(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : '',
      ...headers,
    },
  })

return response as PostResponse<T>
}