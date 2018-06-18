import { emptyObject } from '../shared'
import { superAgentEngine, fetchEngine } from './engines'
import { Header, Url } from './internals'
import { RequestConfiguration, UrlSchema, UrlString, ResponseData } from './type'

class Request
{
  public static interceptors = {
    request: [],
    response: [],
  }
  public static engine: Function = superAgentEngine
  public static readonly engines = {
    superAgent: superAgentEngine,
    fetch: fetchEngine,
  }
  public static interceptor = {
    some()
    {
    },
  }
  protected url: Url
  protected headers: Header
  protected configuration: any

  public constructor(url: UrlSchema | UrlString, options: any = {})
  {
    const {
      headers,
    } = options

    this.headers = new Header(headers)
    this.url = new Url(url)
    this.configuration = { ...options }
    delete this.configuration.headers

    // @ts-ignore: we know this is crazy but we need it
    return this.start()
  }

  public static config(requestConfig: RequestConfiguration): void
  {
    const {
      requestInterceptors = emptyObject,
      responseInterceptors = emptyObject,
    } = requestConfig

    for (const key in requestInterceptors)
    {
      Request.interceptors.request.push(requestInterceptors[key])
    }

    for (const key in responseInterceptors)
    {
      Request.interceptors.response.push(requestInterceptors[key])
    }
  }

  public start(): Promise<ResponseData>
  {
    const requestInterceptors = Request.interceptors.request
    const requestInterceptor = Request.interceptor

    requestInterceptors.forEach((interceptor) =>
    {
      if (typeof interceptor === 'string')
      {
        requestInterceptor[interceptor](this)
      }

      interceptor(this)
    })

    return Request.engine({
      url: this.url.getUrl(),
      headers: this.headers.getHeaders(),
      ...this.configuration,
    })
  }
}

export default Request
