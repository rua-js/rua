import { UrlSchema, UrlString } from './type'
import { Header, Url } from './internals'
import { superAgentEngine } from './engines'

class Request
{
  public static interceptors = []
  public static interceptor = {}
  protected url: Url
  protected headers: Header
  protected config: any

  public constructor(url: UrlSchema | UrlString, options: any = {})
  {
    const {
      headers,
    } = options

    this.headers = new Header(headers)
    this.url = new Url(url)
    this.config = options ? { ...options } : {}
    delete this.config.headers

    // @ts-ignore: we know this is crazy but we need it
    return this.start()
  }

  public start (): Promise<any>
  {
    return superAgentEngine({
      url: this.url.getUrl(),
      headers: this.headers.getHeaders(),
      ...this.config,
    }).then(a => a.body)
  }
}

export default Request
