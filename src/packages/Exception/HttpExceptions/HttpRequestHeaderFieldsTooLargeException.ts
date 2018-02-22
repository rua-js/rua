import { HttpException } from '../Exceptions'

/**
 * HttpRequestHeaderFieldsTooLargeException extends HttpException
 *
 * @class HttpRequestHeaderFieldsTooLargeException
 */
class HttpRequestHeaderFieldsTooLargeException extends HttpException {
  constructor() {
    super(431, 'Request Header Fields Too Large')
  }
}

export default HttpRequestHeaderFieldsTooLargeException
