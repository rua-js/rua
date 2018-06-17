import RequestOptions from './RequestOptions'
import { Header } from '../internals'

interface RequestOptionsPassedToEngine extends RequestOptions
{
  url: string

  headers: Header

  method: string

  timeout: number

  retry: number

  before?: Function
}

export default RequestOptionsPassedToEngine
