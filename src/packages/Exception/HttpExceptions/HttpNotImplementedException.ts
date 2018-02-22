import { HttpException } from '../Exceptions'

/**
 * HttpNotImplementedException extends HttpException
 *
 * @class HttpNotImplementedException
 */
class HttpNotImplementedException extends HttpException {
  constructor() {
    super(501, 'Not Implemented')
  }
}

export default HttpNotImplementedException
