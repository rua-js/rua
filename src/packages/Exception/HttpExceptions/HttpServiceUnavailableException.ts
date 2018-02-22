import { HttpException } from '../Exceptions'

/**
 * HttpServiceUnavailableException extends HttpException
 *
 * @class HttpServiceUnavailableException
 */
class HttpServiceUnavailableException extends HttpException {
  constructor() {
    super(503, 'Service Unavailable')
  }
}

export default HttpServiceUnavailableException
