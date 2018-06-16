import AnyObject from 'rua-core/lib/Types/AnyObject'

interface RequestInterface {

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
   * Abort function
   *
   * @type {Function}
   */
  abort: Function

  /**
   * Starts the request
   *
   * @returns {Promise<Response>}
   */
  start(url: string, options: AnyObject): Promise<Response>
}

export default RequestInterface
