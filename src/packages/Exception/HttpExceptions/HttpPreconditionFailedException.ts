import { HttpException } from '../Exceptions'

/**
 * HttpPreconditionFailedException extends HttpException
 *
 * @class HttpPreconditionFailedException
 */
class HttpPreconditionFailedException extends HttpException {
  constructor() {
    super(412, 'Precondition Failed')
  }
}

export default HttpPreconditionFailedException
