import AnyObject from 'rua-core/lib/Types/AnyObject'

interface RuaFetchInterface {
  /**
   * Interceptors
   *
   * @type {Object}
   */
  interceptor: AnyObject

  /**
   * Url
   *
   * @type {String}
   */
  url: string

  /**
   * Options
   *
   * @type {Object}
   */
  options: AnyObject

  /**
   * Starts the request
   *
   * @returns {Promise<Response>}
   */
  start(): Promise<Response>
}

export default RuaFetchInterface
