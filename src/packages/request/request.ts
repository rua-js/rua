import { AnyObject } from 'rua-core/lib/Types'
import *  as Promise from 'bluebird'
import * as _ from 'lodash'

import fetch from './third-party/fetch'
import Interceptor from './Interceptor'
import { RequestInterface } from './interface'
import { CodedHttpExceptions, HttpAbortException, HttpException, HttpRequestTimeoutException } from '../exception'
import { convertor } from '../convertor'
import RequestConfiguration from './Type/RequestConfiguration'

function checkStatus(response: Response): Response
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

export default function request(url: string, options: AnyObject = {})
{
  const config = {
    url,
    options,
  }

  const {
    before,
    timeout,
    form,
    ...restOptions,
  } = config.options

  // init headers
  if (!restOptions.headers)
  {
    restOptions.headers = {}
  }

  // apply before
  if (typeof before === 'function')
  {
    before(options)
  }
  // apply request interceptor

  // auto stringify
  const isFormData = restOptions.body instanceof FormData

  if (!isFormData)
  {
    if (form)
    {
      restOptions.body = convertor.JSON2FormData(restOptions.body)
    } else
    {
      restOptions.headers['Content-Type'] = 'application/json'
      restOptions.body = JSON.stringify(restOptions.body)
    }
  }

  // setup abort situations
  const promises = [
    fetch(config.url, restOptions)
      .then(checkStatus)
      .then(res => res.json())
      .then((data) =>
      {
        return data
      }),
    // abort
    new Promise((resolve, reject) =>
    {
      config.options.abort = () =>
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
      setTimeout(
        () =>
        {
          reject(new HttpRequestTimeoutException())
        },
        timeout,
      )
    }))
  }

  return Promise.race(promises)
}

// rua.js provided interceptor
request.interceptor = {}

class request2 implements RequestInterface
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
    this.url = url
    this.options = options
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

    request.interceptor.request.add(requestInterceptors)
    request.interceptor.response.add(responseInterceptors)
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
    // request interceptors
    const requestInterceptorInstance = request.interceptor.request

    requestInterceptorInstance
      .interceptorOrder
      .forEach((interceptorName: string) =>
      {
        requestInterceptorInstance.get(interceptorName)(this)
      })

    // destruct
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
      restOptions.body = convertor.JSON2FormData(restOptions.body)
    }

    if (!isRequireForm && !isFormData)
    {
      restOptions.headers['Content-Type'] = 'application/json'
      restOptions.body = JSON.stringify(restOptions.body)
    }

    this.options = restOptions

    // setup abort situations
    const promises = [
      fetch(this.url, this.options)
        .then(request.checkStatus)
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
