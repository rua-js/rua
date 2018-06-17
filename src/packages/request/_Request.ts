import { UrlSchema } from './type'
import { Header, Url } from './internals'

class Request
{
  public static interceptors = []
  public static interceptor = {}
  protected url: Url
  protected headers: Header

  public constructor(url: UrlSchema, options: any)
  {
    const {
      headers,
    } = options

    this.headers = new Header(headers)
    this.url = new Url(url)

    this.start()
  }

  public start(): void
  {
  }
}

export default Request
