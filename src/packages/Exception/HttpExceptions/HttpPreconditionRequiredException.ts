import { HttpException } from '../Exceptions'

/**
 * HttpPreconditionRequiredException extends HttpException
 *
 * @class HttpPreconditionRequiredException
 */
class HttpPreconditionRequiredException extends HttpException {
  constructor() {
    super(428, 'Precondition Required')
  }
}

export default HttpPreconditionRequiredException
