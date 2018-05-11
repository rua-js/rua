import { AnyObject } from 'rua-core/lib/Types'
import AbstractRuaPackage from 'rua-core/lib/Abstractions/AbstractRuaPackage'
import * as _ from 'lodash'

import fetch from './ThirdParty/fetch'
import Interceptor from './Interceptor'
import { FetchInterface } from './Interface'
import { CodedHttpExceptions, HttpAbortException, HttpException, HttpRequestTimeoutException, } from '../Exception'
import { convertor, } from '../Convertor'

class Fetch extends AbstractRuaPackage implements FetchInterface
{
  /**
   * Interceptors
   *
   * @type {Object}
   */
  public interceptor: AnyObject = {
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
  constructor(url: string, options: AnyObject = {})
  {
    super()
    this.url = url
    this.options = options
    this.booted = true
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

    // auto form convention
    if (form)
    {
      restOptions.body = convertor.Json2FormData(restOptions.body)
    }

    // auto content-type
    let ContentType = 'application/json'

    if (form || restOptions.body instanceof FormData)
    {
      ContentType = 'application/x-www-form-urlencoded'
    }

    restOptions.headers['Content-Type'] = ContentType

    // setup abort situations
    const promises = [
      fetch(this.url, restOptions)
        .then(Fetch.checkStatus)
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

export default Fetch
