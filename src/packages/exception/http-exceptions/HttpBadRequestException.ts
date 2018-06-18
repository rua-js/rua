import { HttpException } from '../exceptions'

/**
 * HttpBadRequestException extends HttpException
 *
 * @class HttpBadRequestException
 */
class HttpBadRequestException extends HttpException {
  constructor() {
    super(400, 'Bad Request')
  }
}

export default HttpBadRequestException
