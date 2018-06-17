/**
 * HTTP Header.
 */
import { HeaderInterface } from '../interface'

class Header implements HeaderInterface
{
  protected headers: any

  public constructor(headers?: any)
  {
    this.headers = headers || {}
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

  }
}

export default Header
