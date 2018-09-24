import Exception from './Exception'
import { HttpExceptionInterface } from './interface'

/**
 * HttpException extends exception
 *
 * @class HttpException
 */
class HttpException extends Exception implements HttpExceptionInterface
{

  /**
   * Status code
   *
   * @type {number}
   */
  public code: number

  /**
   * @constructor
   * @param {number} code
   * @param {string} message
   */
  public constructor(code: number = -1, message?: string)
  {
    super(message)
    this.code = code
  }
}

export default HttpException
