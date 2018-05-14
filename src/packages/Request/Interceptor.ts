import { InterceptorInterface } from './Interface'
import AnyObject from 'rua-core/lib/Types/AnyObject'
import * as _ from 'lodash'

class Interceptor implements InterceptorInterface {

  /**
   * Keeps all interceptors
   *
   * @type {Object}
   */
  public interceptor: AnyObject = {}

  /**
   * Adds one interceptor with name
   *
   * @param {String} name
   * @param {Function} interceptor
   */
  public add(name: string, interceptor: Function): void {
    this.interceptor[name] = interceptor
  }

  /**
   * Removes one interceptor with name
   *
   * @param {String} name
   */
  public remove(name: string): void {
    _.unset(this.interceptor, name)
  }

  /**
   * Loads interceptors
   * @param {Object} interceptors
   */
  public load(interceptors: AnyObject): void {
    this.interceptor = interceptors
  }

  /**
   * Gets all interceptors
   *
   * @returns {Function[]}
   */
  public all(): AnyObject {
    return this.interceptor
  }
}

export default Interceptor