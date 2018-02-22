import { HttpException } from '../Exceptions'

/**
 * HttpProxyAuthenticationException extends HttpException
 *
 * @class HttpProxyAuthenticationException
 */
class HttpProxyAuthenticationException extends HttpException {
  constructor() {
    super(409, 'Proxy Authentication')
  }
}

export default HttpProxyAuthenticationException
