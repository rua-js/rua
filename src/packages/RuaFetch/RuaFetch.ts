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
   * Abort function
   *
   * @type {Function}
   */
  public abort: Function = _.noop

  /**
   * @constructor
   */
  constructor(url: string, options: AnyObject = {}) {
    super()
    this.url = url
    this.options = options
    // setup abortFn
    new Promise((resolve, reject) => {
      this.abort = () => {
        reject()
      }
    })
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

export default RuaFetch
