import { HttpException } from '../exceptions'

/**
 * HttpAbortException extends HttpException
 *
 * @class HttpAbortException
 */
class HttpAbortException extends HttpException {
  constructor() {
    super(0, 'Abort')
  }
}

export default HttpAbortException