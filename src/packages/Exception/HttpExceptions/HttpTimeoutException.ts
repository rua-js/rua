import { HttpException } from '../Exceptions'

/**
 * HttpTimeoutException extends HttpException
 *
 * @class HttpTimeoutException
 */
class HttpTimeoutException extends HttpException {
  constructor() {
    super(0, 'Client-Side Timeout')
  }
}

export default HttpTimeoutException
