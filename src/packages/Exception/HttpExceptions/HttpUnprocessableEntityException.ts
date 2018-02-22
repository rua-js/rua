import { HttpException } from '../Exceptions'

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
