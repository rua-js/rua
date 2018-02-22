import { HttpException } from '../Exceptions'

/**
 * HttpGatewayTimeoutException extends HttpException
 *
 * @class HttpGatewayTimeoutException
 */
class HttpGatewayTimeoutException extends HttpException {
  constructor() {
    super(504, 'Gateway Timeout')
  }
}

export default HttpGatewayTimeoutException
