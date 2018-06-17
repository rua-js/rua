import { HttpException } from '../exceptions'

/**
 * HttpNotFoundException extends HttpException
 *
 * @class HttpNotFoundException
 */
class HttpNotFoundException extends HttpException {
  constructor() {
    super(404, 'Not Found')
  }
}

export default HttpNotFoundException