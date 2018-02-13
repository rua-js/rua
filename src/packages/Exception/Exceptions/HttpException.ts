import Exception from '../Exception'
import { HttpExceptionInterface } from '../Interface'

/**
 * HttpException extends Exception
 *
 * @class HttpException
 */
class HttpException extends Exception implements HttpExceptionInterface {
  constructor(status: number = -1, message?: string) {
    super(message)
  }
}

export default HttpException
