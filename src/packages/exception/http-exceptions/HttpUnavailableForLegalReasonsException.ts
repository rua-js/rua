import { HttpException } from '../exceptions'

/**
 * HttpUnavailableForLegalReasonsException extends HttpException
 *
 * @class HttpUnavailableForLegalReasonsException
 */
class HttpUnavailableForLegalReasonsException extends HttpException {
  constructor() {
    super(451, 'Unavailable For Legal Reasons')
  }
}

export default HttpUnavailableForLegalReasonsException
