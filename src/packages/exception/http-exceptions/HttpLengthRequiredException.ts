import { HttpException } from '../exceptions'

/**
 * HttpLengthRequiredException extends HttpException
 *
 * @class HttpLengthRequiredException
 */
class HttpLengthRequiredException extends HttpException {
  constructor() {
    super(411, 'Length Required')
  }
}

export default HttpLengthRequiredException
