import Headers from './Headers'

interface RequestOptions
{
  headers?: Headers

  method?: string

  query?: {
    [key: string]: string | number,
  }

  type?: string

  accept?: string

  withCredentials?: boolean

  timeout?: number

  retry?: number

  retryCallback?: Function
}

export default RequestOptions
