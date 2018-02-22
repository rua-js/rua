import { HttpException } from '../Exceptions'

/**
 * HttpUpgradeRequiredException extends HttpException
 *
 * @class HttpUpgradeRequiredException
 */
class HttpUpgradeRequiredException extends HttpException {
  constructor() {
    super(426, 'Upgrade Required')
  }
}

export default HttpUpgradeRequiredException
