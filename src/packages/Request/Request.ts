import { AnyObject } from 'rua-core/lib/Types'
import AbstractRuaPackage from 'rua-core/lib/Abstractions/AbstractRuaPackage'
import * as _ from 'lodash'

import fetch from './ThirdParty/fetch'
import Interceptor from './Interceptor'
import { RequestInterface } from './Interface'
import { CodedHttpExceptions, HttpAbortException, HttpException, HttpRequestTimeoutException, } from '../Exception'
import { convertor, } from '../Convertor'
import { CanConfig } from 'rua-core/lib/Contracts'
import RequestConfiguration from './Type/RequestConfiguration'

class Request extends AbstractRuaPackage implements RequestInterface
{
  /**
   * Interceptors
   *
   * @type {Object}
   */
  public static interceptor: AnyObject = {
    request: new Interceptor,
    response: new Interceptor,
  }

  /**
   * Url
   *
   * @type {String}
   */
  public url: string = ''

  /**
   * Options
   *
   * @type {Object}
   */
  public options: AnyObject = {}

  /**
   * Abort function
   *
   * @type {Function}
   */
  public abort: Function = _.noop

  /**
   * @constructor
   */
  constructor(url: string, options: AnyObject)
  {
    super()
    this.url = url
    this.options = options
    this.booted = true
  }

  /**
   * Rua configuration interface
   *
   * @param {RequestConfiguration} configuration
   */
  public static config(configuration: RequestConfiguration)
  {
    const {
      requestInterceptors,
      responseInterceptors,
    } = configuration

    Request.interceptor.request.add(requestInterceptors)
    Request.interceptor.response.add(responseInterceptors)
  }

  /**
   * Parses response
   *
   * @param {Response} response
   * @returns {Response}
   * @throws {Error}
   */
  public static checkStatus(response: Response): Response
  {
    if (response.status >= 200 && response.status < 300)
    {
      return response
    }

    const Exception = (<AnyObject>CodedHttpExceptions)[response.status] || HttpException

    const error: any = new Exception(response.status, response.statusText)
    error.response = response
    throw error
  }

  /**
   * Starts the request
   *
   * @returns {Promise<Response>}
   */
  public start(): Promise<Response>
  {
    let {
      before,
      timeout,
      form,
      ...restOptions
    } = this.options

    // init headers
    if (!restOptions.headers)
    {
      restOptions.headers = {}
    }

    // apply before
    if (_.isFunction(before))
    {
      before(this)
    }
    // apply request interceptor

    // auto stringify
    const isRequireForm = form
    const isFormData = restOptions.body instanceof FormData

    if (isRequireForm && !isFormData)
    {
      restOptions.body = convertor.Json2FormData(restOptions.body)
    }

    if (!isRequireForm && !isFormData)
    {
      restOptions.headers['Content-Type'] = 'application/json'
      restOptions.body = JSON.stringify(restOptions.body)
    }

    // request interceptors
    const requestInterceptorInstance = Request.interceptor.request

    requestInterceptorInstance.interceptorOrder.forEach((interceptorName: string) => {
      requestInterceptorInstance.get(interceptorName)(this)
    })

    // setup abort situations
    const promises = [
      fetch(this.url, restOptions)
        .then(Request.checkStatus)
        .then(res => res.json())
        .then((data) =>
        {
          return data
        }),
      // abort
      new Promise((resolve, reject) =>
      {
        this.abort = () =>
        {
          reject(new HttpAbortException())
        }
      }),
    ]

    // if timeout is set, add timeout Promise
    if (timeout > 0)
    {
      promises.push(new Promise((resolve, reject) =>
      {
        setTimeout(() =>
        {
          reject(new HttpRequestTimeoutException())
        }, timeout)
      }))
    }

    return Promise.race(promises)
  }
}

export default Request
