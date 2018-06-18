import { HttpException } from '../exceptions'

/**
 * HttpInternalServerErrorException extends HttpException
 *
 * @class HttpInternalServerErrorException
 */
class HttpInternalServerErrorException extends HttpException {
  constructor() {
    super(500, 'Internal Server Error')
  }
}

export default HttpInternalServerErrorException
