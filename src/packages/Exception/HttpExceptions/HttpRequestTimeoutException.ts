import { HttpException } from '../Exceptions'

/**
 * HttpRequestTimeoutException extends HttpException
 *
 * @class HttpRequestTimeoutException
 */
class HttpRequestTimeoutException extends HttpException {
  constructor() {
    super(409, 'RequestTimeout')
  }
}

export default HttpRequestTimeoutException
