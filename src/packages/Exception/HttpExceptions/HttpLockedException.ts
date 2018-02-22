import { HttpException } from '../Exceptions'

/**
 * HttpLockedException extends HttpException
 *
 * @class HttpLockedException
 */
class HttpLockedException extends HttpException {
  constructor() {
    super(423, 'Locked')
  }
}

export default HttpLockedException
