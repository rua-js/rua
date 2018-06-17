import { HttpException } from '../exceptions'

/**
 * HttpPaymentRequiredException extends HttpException
 *
 * @class HttpPaymentRequiredException
 */
class HttpPaymentRequiredException extends HttpException {
  constructor() {
    super(402, 'Payment Required')
  }
}

export default HttpPaymentRequiredException