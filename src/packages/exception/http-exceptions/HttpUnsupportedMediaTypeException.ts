import { HttpException } from '../exceptions'

/**
 * HttpUnsupportedMediaTypeException extends HttpException
 *
 * @class HttpUnsupportedMediaTypeException
 */
class HttpUnsupportedMediaTypeException extends HttpException {
  constructor() {
    super(415, 'Unsupported Media type')
  }
}

export default HttpUnsupportedMediaTypeException
