import { HttpException } from '../Exceptions'

/**
 * HttpUnavailableForLegalReasonsException extends HttpException
 *
 * @class HttpUnavailableForLegalReasonsException
 */
class HttpUnavailableForLegalReasonsException extends HttpException {
  constructor() {
    super(451, 'UnavailableForLegalReasons')
  }
}

export default HttpUnavailableForLegalReasonsException
