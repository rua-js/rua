import { AnyObject } from '../../type/data'
import Query from './Query'
import { Header } from '../internals'

interface RequestOptions
{
  headers?: Header

  method?: string

  query?: Query

  type?: string

  accept?: string

  withCredentials?: boolean

  timeout?: number

  retry?: number

  retryCallback?: Function

  form?: boolean

  body?: AnyObject
}

export default RequestOptions
