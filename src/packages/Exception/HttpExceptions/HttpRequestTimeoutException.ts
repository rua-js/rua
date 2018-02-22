import { HttpException } from '../Exceptions'

/**
 * HttpRequestTimeoutException extends HttpException
 *
 * @class HttpRequestTimeoutException
 */
class HttpRequestTimeoutException extends HttpException {
  constructor() {
    super(408, 'Request Timeout')
  }
}

export default HttpRequestTimeoutException
