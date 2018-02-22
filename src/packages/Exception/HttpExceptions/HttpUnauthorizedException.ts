import { HttpException } from '../Exceptions'

/**
 * HttpUnauthorizedException extends HttpException
 *
 * @class HttpUnauthorizedException
 */
class HttpUnauthorizedException extends HttpException {
  constructor() {
    super(401, 'Unauthorized')
  }
}

export default HttpUnauthorizedException
