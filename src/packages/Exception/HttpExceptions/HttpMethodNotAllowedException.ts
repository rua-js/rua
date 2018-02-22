import { HttpException } from '../Exceptions'

/**
 * HttpMethodNotAllowedException extends HttpException
 *
 * @class HttpMethodNotAllowedException
 */
class HttpMethodNotAllowedException extends HttpException {
  constructor() {
    super(409, 'Method Not Allowed')
  }
}

export default HttpMethodNotAllowedException
