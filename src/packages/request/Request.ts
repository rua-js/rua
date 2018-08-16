import { EMPTY_OBJECT } from '../shared'
import { AnyObject, FunctionArray, FunctionObject, ObjectOf } from '../core/type/data'
import { superAgentEngine, fetchEngine } from './engines'
import { Header, Url, Body } from './internals'
import { RequestConfiguration, UrlSchema, UrlString, ResponseData } from './type'

class Request
{
  public static interceptors: ObjectOf<FunctionArray> = {
    request: [],
    response: [],
  }

  public static defaults: AnyObject = {
    engine: superAgentEngine,
    method: 'GET',
  }

  public static readonly engines: FunctionObject = {
    superAgent: superAgentEngine,
    fetch: fetchEngine,
  }

  public static interceptor: FunctionObject = {}

  protected url: Url

  protected headers: Header

  protected body: Body

  protected configuration: any

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

    // @ts-ignore: we know this is crazy but we need it
    return this.start()
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
}

export default Request as any
