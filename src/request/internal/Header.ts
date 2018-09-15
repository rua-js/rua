/**
 * HTTP Headers.
 */
import { HeaderInterface } from '../interface'
import { Headers } from '../type'

class Header implements HeaderInterface
{
  protected headers: Headers

  public constructor(headers?: Headers)
  {
    this.headers = headers ? { ...headers } : {}
  }

  public set(key: string, value: any): void
  {
    this.headers[key] = value
  }

  public get(key: string): any
  {
    return this.headers[key]
  }

  public has(key: string): boolean
  {
    return !!this.headers[key]
  }

  public getHeaders(): Headers
  {
    return this.headers
  }
}

export default Header
