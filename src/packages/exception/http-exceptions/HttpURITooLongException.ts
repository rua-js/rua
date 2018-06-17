import { HttpException } from '../exceptions'

/**
 * HttpURITooLongException extends HttpException
 *
 * @class HttpURITooLongException
 */
class HttpURITooLongException extends HttpException {
  constructor() {
    super(414, 'URI Too Long')
  }
}

export default HttpURITooLongException
