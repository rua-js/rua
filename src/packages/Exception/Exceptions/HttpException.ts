import Exception from '../Exception'
import { HttpExceptionInterface } from '../Interface'

/**
 * HttpException extends Exception
 *
 * @class HttpException
 */
class HttpException extends Exception implements HttpExceptionInterface {

  /**
   * Status code
   *
   * @type {number}
   */
  public statusCode: number

  /**
   * @constructor
   * @param {number} code
   * @param {string} message
   */
  public constructor(code: number = -1, message?: string) {
    super(message)
    this.statusCode = code
  }
}

export default HttpException
