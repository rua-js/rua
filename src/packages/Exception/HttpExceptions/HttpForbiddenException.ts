import { HttpException } from '../Exceptions'

/**
 * HttpForbiddenException extends HttpException
 *
 * @class HttpForbiddenException
 */
class HttpForbiddenException extends HttpException {
  constructor() {
    super(403, 'Forbidden')
  }
}

export default HttpForbiddenException
