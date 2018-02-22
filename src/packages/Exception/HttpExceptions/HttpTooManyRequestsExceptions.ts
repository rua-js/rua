import { HttpException } from '../Exceptions'

/**
 * HttpTooManyRequestsException extends HttpException
 *
 * @class HttpTooManyRequestsException
 */
class HttpTooManyRequestsException extends HttpException {
  constructor() {
    super(429, 'Too Many Requests')
  }
}

export default HttpTooManyRequestsException
