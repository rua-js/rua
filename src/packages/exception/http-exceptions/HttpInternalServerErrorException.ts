import { HttpException } from '../exceptions'

/**
 * HttpInternalServerErrorException extends HttpException
 *
 * @class HttpInternalServerErrorException
 */
class HttpInternalServerErrorException extends HttpException {
  constructor() {
    super(500, 'internals Server Error')
  }
}

export default HttpInternalServerErrorException
