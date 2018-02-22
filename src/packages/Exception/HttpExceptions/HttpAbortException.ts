import { HttpException } from '../Exceptions'

/**
 * HttpAbortException extends HttpException
 *
 * @class HttpAbortException
 */
class HttpAbortException extends HttpException {
  constructor() {
    super(0, 'Not Found')
  }
}

export default HttpAbortException
