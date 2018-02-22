import { HttpException } from '../Exceptions'

/**
 * HttpNotExtendedException extends HttpException
 *
 * @class HttpNotExtendedException
 */
class HttpNotExtendedException extends HttpException {
  constructor() {
    super(510, 'Not Extended')
  }
}

export default HttpNotExtendedException
