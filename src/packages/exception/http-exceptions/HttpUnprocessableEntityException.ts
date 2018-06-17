import { HttpException } from '../exceptions'

/**
 * HttpUnprocessableEntityException extends HttpException
 *
 * @class HttpUnprocessableEntityException
 */
class HttpUnprocessableEntityException extends HttpException {
  constructor() {
    super(422, 'Unprocessable Entity')
  }
}

export default HttpUnprocessableEntityException
