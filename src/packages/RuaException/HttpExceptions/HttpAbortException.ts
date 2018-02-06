import { HttpException } from '../Exceptions'

/**
 * HttpAbortException extends HttpException
 *
 * @class HttpAbortException
 */
class HttpAbortException extends HttpException {
  constructor() {
    super(404, 'Not Found')
  }
}

export default HttpAbortException
