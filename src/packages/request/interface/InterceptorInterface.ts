import { AnyObject } from '../../type/data'

interface InterceptorInterface {
  /**
   * Keeps all interceptors
   */
  interceptor: AnyObject

  /**
   * The order of all the interceptors
   */
  interceptorOrder: string[]

  /**
   * Adds one interceptor with name
   *
   * @param {string} name
   * @param {Function} interceptor
   */
  add(name: string, interceptor: Function): void

  /**
   * Get one interceptor with the specific name
   *
   * @param {string} name
   * @returns {Function}
   */
  get(name: string): Function

  /**
   * Removes one interceptor with name
   *
   * @param {string} name
   */
  remove(name: string): void

  /**
   * Loads interceptors
   *
   * @param {AnyObject} interceptors
   */
  load(interceptors: AnyObject): void

  /**
   * Gets all interceptors
   *
   * @returns {Function[]}
   */
  all(): AnyObject
}

export default InterceptorInterface
