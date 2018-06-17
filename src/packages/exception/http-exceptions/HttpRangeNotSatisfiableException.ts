import { HttpException } from '../exceptions'

/**
 * HttpRangeNotSatisfiableException extends HttpException
 *
 * @class HttpRangeNotSatisfiableException
 */
class HttpRangeNotSatisfiableException extends HttpException {
  constructor() {
    super(416, 'Range Not Satisfiable')
  }
}

export default HttpRangeNotSatisfiableException
