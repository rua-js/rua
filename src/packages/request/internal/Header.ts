/**
 * HTTP Headers.
 */
import { HeaderInterface } from '../interface'
import { Headers } from '../type'

class Header implements HeaderInterface
{
  protected headers: any

  public constructor(headers?: Headers)
  {
    this.headers = headers ? { ...headers } : {}
  }

  public set(key: string, value: any)
  {
    this.headers[key] = value
  }

  public get(key: string)
  {
    return this.headers[key]
  }

  public has(key: string): boolean
  {
    return !!this.headers[key]
  }

  public all(): any
  {
    return this.headers
  }
}

export default Header
