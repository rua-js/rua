import { HttpException } from '../Exceptions'

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
