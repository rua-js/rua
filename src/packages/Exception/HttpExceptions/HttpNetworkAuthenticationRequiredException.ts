import { HttpException } from '../Exceptions'

/**
 * HttpNetworkAuthenticationRequiredException extends HttpException
 *
 * @class HttpNetworkAuthenticationRequiredException
 */
class HttpNetworkAuthenticationRequiredException extends HttpException {
  constructor() {
    super(511, 'Network Authentication Required')
  }
}

export default HttpNetworkAuthenticationRequiredException
