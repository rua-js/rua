import { HttpException } from '../Exceptions'

/**
 * HttpNotAcceptableException extends HttpException
 *
 * @class HttpNotAcceptableException
 */
class HttpNotAcceptableException extends HttpException {
  constructor() {
    super(409, 'Not Acceptable')
  }
}

export default HttpNotAcceptableException
