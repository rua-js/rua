import { HttpException } from '../exceptions'

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
