import { HttpException } from '../Exceptions'

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
