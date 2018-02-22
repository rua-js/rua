import { HttpException } from '../Exceptions'

/**
 * HttpBadGatewayException extends HttpException
 *
 * @class HttpBadGatewayException
 */
class HttpBadGatewayException extends HttpException {
  constructor() {
    super(502, 'Bad Gateway')
  }
}

export default HttpBadGatewayException
