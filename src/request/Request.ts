import { EMPTY_OBJECT } from '../rua/shared'
import { AnyObject, ArrayOf, ObjectOf } from '../rua/type/data'
import { fetchEngine, superAgentEngine } from './engine'
import { Body, Header, Url } from './internal'
import { RequestConfiguration, ResponseData, UrlSchema, UrlString } from './type'

class Request implements PromiseLike<ResponseData>
{
  public static interceptors: ObjectOf<ArrayOf<Function>> = {
    request: [],
    response: [],
  }

  public static defaults: AnyObject = {
    engine: superAgentEngine,
    method: 'GET',
  }

  public static readonly engines: ObjectOf<Function> = {
    superAgent: superAgentEngine,
    fetch: fetchEngine,
  }

  public static interceptor: ObjectOf<Function> = {}

  protected url: Url

  protected headers: Header

  protected body: Body

  protected configuration: any

  protected request: Promise<ResponseData>

  public constructor(
    url: UrlSchema | UrlString,
    bodyOrQuery: AnyObject,
    options: any = {},
  )
  {
    const {
      headers,
    } = options

    // config
    this.headers = new Header(headers)
    this.url = new Url(url)
    this.configuration = { ...options }

    // decide method
    const method = (options.method || Request.defaults.method).toUpperCase()
    this.configuration.method = method

    // decide body and query
    if (
      method
      && (method === 'POST'
      || method === 'PUT'
      || method === 'PATCH')
    )
    {
      this.body = new Body({ ...this.configuration.body, ...bodyOrQuery })
    } else
    {
      this.body = new Body()
      this.configuration.query = { ...this.configuration.query, ...bodyOrQuery }
    }

    this.request = this.start()
  }

  public static config(requestConfig: RequestConfiguration): void
  {
    const {
      defaultMethod,
      requestInterceptors = EMPTY_OBJECT,
      responseInterceptors = EMPTY_OBJECT,
    } = requestConfig

    if (defaultMethod)
    {
      Request.defaults.method = defaultMethod
    }

    for (const key in requestInterceptors)
    {
      Request.interceptors.request.push(requestInterceptors[key])
    }

    for (const key in responseInterceptors)
    {
      Request.interceptors.response.push(responseInterceptors[key])
    }
  }

  public start(): Promise<ResponseData>
  {
    // interceptors
    const requestInterceptors = Request.interceptors.request
    const responseInterceptors = Request.interceptors.response
    const providedInterceptor = Request.interceptor

    requestInterceptors.forEach((interceptor: any) =>
    {
      if (typeof interceptor === 'string')
      {
        return providedInterceptor[interceptor](this)
      }

      return interceptor(this)
    })

    return Request.defaults.engine({
      ...this.configuration,
      url: this.url,
      headers: this.headers,
      body: this.body,
      after: (response: any) =>
      {
        responseInterceptors.forEach((interceptor: any) =>
        {
          if (typeof interceptor === 'string')
          {
            return providedInterceptor[interceptor](response)
          }

          return interceptor(response)
        })

        const after = this.configuration.after

        if (after && 'function' === typeof after)
        {
          after(response)
        }

        return response
      },
    })
  }

  public then(...params: any[]): Promise<any>
  {
    return this.request.then(...params)
  }

  public catch(...params: any[]): Promise<any>
  {
    return this.request.catch(...params)
  }
}

export default Request as any
