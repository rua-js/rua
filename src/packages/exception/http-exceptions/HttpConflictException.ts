import { HttpException } from '../exceptions'

/**
 * HttpConflictException extends HttpException
 *
 * @class HttpConflictException
 */
class HttpConflictException extends HttpException {
  constructor() {
    super(409, 'Conflict')
  }
}

export default HttpConflictException
