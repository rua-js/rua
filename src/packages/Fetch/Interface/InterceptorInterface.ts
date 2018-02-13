import AnyObject from 'rua-core/lib/Types/AnyObject'

interface InterceptorInterface {
  /**
   * Keeps all interceptors
   */
  interceptor: AnyObject

  /**
   * Adds one interceptor with name
   *
   * @param {string} name
   * @param {Function} interceptor
   */
  add(name: string, interceptor: Function): void

  /**
   * Removes one interceptor with name
   *
   * @param {string} name
   */
  remove(name: string): void

  /**
   * Loads interceptors
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
