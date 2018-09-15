import { InterceptorInterface } from './interface'
import * as _ from 'lodash'
import { AnyObject } from '../core/type/data'

class Interceptor implements InterceptorInterface {

  /**
   * Keeps all interceptors
   *
   * @type {Object}
   */
  public interceptor: AnyObject = {}

  /**
   * Order of all interceptors
   *
   * @type {string[]}
   */
  public interceptorOrder: string[] = []

  /**
   * Adds one interceptor with name
   *
   * @param {any} nameOrInterceptors
   * @param {Function} interceptor
   */
  public add(nameOrInterceptors: any, interceptor?: Function): boolean {
    if (_.isObject(nameOrInterceptors)) { // iterate out data if it's an array

      for(const name in nameOrInterceptors) {
        this.add(name, nameOrInterceptors[name])
      }

      return true
    }
    // if it is not
    this.interceptor[nameOrInterceptors] = interceptor
    this.interceptorOrder.push(nameOrInterceptors)
    return true
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
   * Get one interceptor with the specific name
   *
   * @param {string} name
   * @returns {Function}
   */
  public get(name: string): Function {
    return this.interceptor[name]
  }

  /**
   * Loads interceptors
   *
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
