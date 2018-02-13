import { HttpException } from '../Exceptions'

/**
 * HttpTimeoutException extends HttpException
 *
 * @class HttpTimeoutException
 */
class HttpTimeoutException extends HttpException {
  constructor() {
    super(404, 'Not Found')
  }
}

export default HttpTimeoutException
