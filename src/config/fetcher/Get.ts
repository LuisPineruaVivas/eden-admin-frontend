import axios, { AxiosResponse } from 'axios';

interface GetResponse<T> extends AxiosResponse<T> {
  data: T;
}

type GetFunction = <T>(
  url: string,
  token?: string,
  headers?: Record<string, string>
) => Promise<GetResponse<T>>;

export const GET: GetFunction = async <T>(
  url: string,
  token?: string,
  headers?: Record<string, string>,
): Promise<GetResponse<T>> => {

  const response = await axios.get<T>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    }
  });
  return response as GetResponse<T>;
};
