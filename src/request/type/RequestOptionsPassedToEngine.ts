import RequestOptions from './RequestOptions'
import { Header, Body, Url } from '../internal'

interface RequestOptionsPassedToEngine extends RequestOptions
{
  url: Url

  headers: Header

  body: Body

  method: string

  timeout: number

  retry: number

  before?: Function

  after: Function
}

export default RequestOptionsPassedToEngine
