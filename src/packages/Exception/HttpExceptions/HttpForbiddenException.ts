import { HttpException } from '../Exceptions'

/**
 * HttpForbiddenException extends HttpException
 *
 * @class HttpForbiddenException
 */
class HttpForbiddenException extends HttpException {
  constructor() {
    super(403, 'Bad Request')
  }
}

export default HttpForbiddenException
