import { HttpException } from '../exceptions'

/**
 * HttpRequestHeaderFieldsTooLargeException extends HttpException
 *
 * @class HttpRequestHeaderFieldsTooLargeException
 */
class HttpRequestHeaderFieldsTooLargeException extends HttpException {
  constructor() {
    super(431, 'Request Headers Fields Too Large')
  }
}

export default HttpRequestHeaderFieldsTooLargeException
