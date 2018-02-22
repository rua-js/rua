import { HttpException } from '../Exceptions'

/**
 * HttpGoneException extends HttpException
 *
 * @class HttpGoneException
 */
class HttpGoneException extends HttpException {
  constructor() {
    super(410, 'Gone')
  }
}

export default HttpGoneException
