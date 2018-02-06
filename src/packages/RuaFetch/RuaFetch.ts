import { AnyObject } from 'rua-core/lib/Types'
import AbstractRuaPackage from 'rua-core/lib/Abstractions/AbstractRuaPackage'
import * as _ from 'lodash'

import fetch from './ThirdParty/fetch'
import Interceptor from './Interceptor'
import { InterceptorInterface, RuaFetchInterface } from './Interface'

class RuaFetch extends AbstractRuaPackage implements RuaFetchInterface{
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
   * @constructor
   */
  constructor(url: string, options: AnyObject = {}) {
    super()
    this.url = url
    this.options = options
    this.booted = true
  }

  /**
   * Starts the request
   *
   * @returns {Promise<Response>}
   */
  public start(): Promise<Response> {
    const {
      before,
      timeout,
      ...rest
    } = this.options
    // apply before
    if (_.isFunction(before)) {
      before(this)
    }
    // apply request interceptor


    return fetch(this.url, this.options)
      .then(RuaFetch.checkStatus)
      .then(res => res.json())
      .then((data) => {
        return data
      })
  }

  /**
   * Parses response
   *
   * @param {Response} response
   * @returns {Response}
   * @throws {Error}
   */
  public static checkStatus(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response
    }

    const error: any = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// class RuaFetch2 {
//
//   public static rawFetch = fetch
//
//   public static catchedFetch(url: string, options: AnyObject = {}): Promise<any> {
//
//     return RuaFetch.fetch(url, options)
//       .then(data => ({ data }))
//       .catch(err => ({ err }))
//   }
//
//   public static fetch(url: string, options: AnyObject = {}): Promise<any> {
//     // Define defaults
//     const defaultHeaders: AnyObject = {
//       Accept: 'application/json, text/plain, */*',
//       'Content-Type': 'application/json',
//       ...options.extraHeaders,
//     }
//
//     // Destruct options
//     let {
//       headers = defaultHeaders,
//       body,
//       ...rest
//     } = options
//
//     // Set multi-part header if body is FormData
//     // Stringify body if body is NOT FormData
//     if (body instanceof FormData) {
//       headers['Content-Type'] = 'multipart/form-data'
//     } else {
//       headers['Content-Type'] = 'application/json'
//       body = JSON.stringify(body)
//     }
//
//     // Generates Options used by fetch
//     const settings = {
//       headers,
//       body,
//       ...rest,
//     }
//
//     return fetch(url, settings)
//       .then(RuaFetch.checkStatus)
//       .then(RuaFetch.parseJSON)
//   }
//
//   public static parseJSON(response: Response): Promise<AnyObject> {
//     return response.json()
//   }
//
//   public static checkStatus(response: Response): Response {
//     if (response.status >= 200 && response.status < 300) {
//       return response
//     }
//
//     const error: any = new Error(response.statusText)
//     error.response = response
//     throw error
//   }
// }

export default RuaFetch
