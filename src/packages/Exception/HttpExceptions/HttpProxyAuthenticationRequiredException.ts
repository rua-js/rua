import { HttpException } from '../Exceptions'

/**
 * HttpProxyAuthenticationException extends HttpException
 *
 * @class HttpProxyAuthenticationException
 */
class HttpProxyAuthenticationException extends HttpException {
  constructor() {
    super(407, 'Proxy Authentication')
  }
}

export default HttpProxyAuthenticationException
